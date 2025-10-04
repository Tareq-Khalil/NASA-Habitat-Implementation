// NASA Crew Path & Access Analysis Tool
// Data-Driven A* Pathfinding with Clearance Validation
// Reference: "Internal Layout of a Lunar Surface Habitat"

export const MIN_PATH_WIDTH = 1.0; // NASA standard: 1.0m (39.4 inches)
export const GRID_RESOLUTION = 0.5; // 50cm grid cells

// ============================================================================
// A* PATHFINDING ALGORITHM
// ============================================================================

class GridNode {
  constructor(x, z, worldX, worldZ) {
    this.x = x; // Grid coordinates
    this.z = z;
    this.worldX = worldX; // World coordinates
    this.worldZ = worldZ;
    this.g = 0; // Cost from start
    this.h = 0; // Heuristic to end
    this.f = 0; // Total cost
    this.parent = null;
    this.walkable = true;
  }
}

// Create 2D navigation grid
function createNavigationGrid(habitatStructure, modules) {
  const radius = habitatStructure.radius;
  const gridSize = Math.ceil((radius * 2.2) / GRID_RESOLUTION); // Add 10% padding
  const grid = [];
  
  console.log(`📐 Creating ${gridSize}x${gridSize} navigation grid (habitat radius: ${radius}m)...`);
  
  // Initialize grid
  for (let x = 0; x < gridSize; x++) {
    grid[x] = [];
    for (let z = 0; z < gridSize; z++) {
      const worldX = (x - gridSize / 2) * GRID_RESOLUTION;
      const worldZ = (z - gridSize / 2) * GRID_RESOLUTION;
      grid[x][z] = new GridNode(x, z, worldX, worldZ);
      
      // Check if cell is within habitat bounds (with small margin)
      const distFromCenter = Math.sqrt(worldX * worldX + worldZ * worldZ);
      if (distFromCenter > radius - 0.3) {
        grid[x][z].walkable = false;
      }
    }
  }
  
  // Mark cells occupied by modules as unwalkable
  let blockedCells = 0;
  for (const module of modules) {
    const modulePos = module.position;
    const moduleSize = (module.userData && module.userData.size) || 1.5;
    
    // ✅ TWO-STEP APPROACH: Use a smaller, fixed "keep-out" buffer during pathfinding.
    // This allows A* to find paths through tight spaces in high-density layouts.
    // The strict 1.0m NASA clearance check happens later in analyzePath().
    const moduleRadius = moduleSize / 2 + 0.3;
    
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const node = grid[x][z];
        const dx = node.worldX - modulePos.x;
        const dz = node.worldZ - modulePos.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        if (dist < moduleRadius) {
          node.walkable = false;
          blockedCells++;
        }
      }
    }
  }
  
  const totalCells = gridSize * gridSize;
  const blockPercentage = ((blockedCells / totalCells) * 100).toFixed(1);
  console.log(`  ✓ Grid created: ${blockedCells}/${totalCells} cells blocked (${blockPercentage}%)`);
  return grid;
}

// Get grid coordinates from world position
function worldToGrid(worldX, worldZ, grid) {
  const gridSize = grid.length;
  const x = Math.round((worldX / GRID_RESOLUTION) + gridSize / 2);
  const z = Math.round((worldZ / GRID_RESOLUTION) + gridSize / 2);
  
  if (x >= 0 && x < gridSize && z >= 0 && z < gridSize) {
    return grid[x][z];
  }
  return null;
}

// Heuristic function (Euclidean distance)
function heuristic(nodeA, nodeB) {
  const dx = nodeA.worldX - nodeB.worldX;
  const dz = nodeA.worldZ - nodeB.worldZ;
  return Math.sqrt(dx * dx + dz * dz);
}

// Get walkable neighbors (8 directions)
function getNeighbors(node, grid) {
  const neighbors = [];
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],  // Cardinal
    [1, 1], [1, -1], [-1, 1], [-1, -1] // Diagonal
  ];
  
  for (const [dx, dz] of directions) {
    const newX = node.x + dx;
    const newZ = node.z + dz;
    
    if (newX >= 0 && newX < grid.length && newZ >= 0 && newZ < grid[0].length) {
      const neighbor = grid[newX][newZ];
      if (neighbor.walkable) {
        neighbors.push(neighbor);
      }
    }
  }
  
  return neighbors;
}

// A* pathfinding algorithm
export function findPath(startPos, endPos, modules, habitatStructure) {
  console.log('🔍 A* Pathfinding:');
  console.log(`  Start: (${startPos.x.toFixed(2)}, ${startPos.z.toFixed(2)})`);
  console.log(`  End: (${endPos.x.toFixed(2)}, ${endPos.z.toFixed(2)})`);
  console.log(`  Obstacles: ${modules.length} modules`);
  
  // Create navigation grid
  const grid = createNavigationGrid(habitatStructure, modules);
  
  // Get start and end nodes
  const startNode = worldToGrid(startPos.x, startPos.z, grid);
  const endNode = worldToGrid(endPos.x, endPos.z, grid);
  
  if (!startNode || !endNode) {
    console.error('  ❌ Start or end point outside grid');
    return null;
  }
  
  // Always allow start and end points (user clicked floor, trust their selection)
  if (!startNode.walkable) {
    console.log('  ℹ️ Start point in blocked cell - allowing as clicked point');
    startNode.walkable = true;
    
    // Unblock immediate neighbors to ensure pathfinding can start
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const nx = startNode.x + dx;
        const nz = startNode.z + dz;
        if (nx >= 0 && nx < grid.length && nz >= 0 && nz < grid[0].length) {
          grid[nx][nz].walkable = true;
        }
      }
    }
  }
  
  if (!endNode.walkable) {
    console.log('  ℹ️ End point in blocked cell - allowing as clicked point');
    endNode.walkable = true;
    
    // Unblock immediate neighbors to ensure pathfinding can reach goal
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const nx = endNode.x + dx;
        const nz = endNode.z + dz;
        if (nx >= 0 && nx < grid.length && nz >= 0 && nz < grid[0].length) {
          grid[nx][nz].walkable = true;
        }
      }
    }
  }
  
  // Initialize A*
  const openSet = [startNode];
  const closedSet = new Set();
  startNode.g = 0;
  startNode.h = heuristic(startNode, endNode);
  startNode.f = startNode.h;
  
  let iterations = 0;
  const maxIterations = 50000; // Increased for complex layouts
  
  while (openSet.length > 0 && iterations < maxIterations) {
    iterations++;
    
    // Find node with lowest f score
    let currentIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < openSet[currentIndex].f) {
        currentIndex = i;
      }
    }
    
    const current = openSet[currentIndex];
    
    // Check if reached goal
    if (current === endNode) {
      // Reconstruct path
      const path = [];
      let temp = current;
      while (temp) {
        path.unshift({
          x: temp.worldX,
          y: 0.1,
          z: temp.worldZ
        });
        temp = temp.parent;
      }
      
      console.log(`  ✅ Path found: ${path.length} waypoints in ${iterations} iterations`);
      return path;
    }
    
    // Move current to closed set
    openSet.splice(currentIndex, 1);
    closedSet.add(current);
    
    // Check all neighbors
    const neighbors = getNeighbors(current, grid);
    
    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor)) continue;
      
      // Calculate tentative g score
      const tentativeG = current.g + heuristic(current, neighbor);
      
      const inOpenSet = openSet.includes(neighbor);
      
      if (!inOpenSet || tentativeG < neighbor.g) {
        neighbor.parent = current;
        neighbor.g = tentativeG;
        neighbor.h = heuristic(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;
        
        if (!inOpenSet) {
          openSet.push(neighbor);
        }
      }
    }
    
    // Debug logging for early termination
    if (iterations % 1000 === 0) {
      console.log(`  ⏳ Progress: ${iterations} iterations, openSet: ${openSet.length}, closed: ${closedSet.size}`);
    }
  }
  
  console.error(`  ❌ No path found after ${iterations} iterations`);
  console.error(`  Final state: openSet=${openSet.length}, closedSet=${closedSet.size}`);
  return null;
}

// ============================================================================
// CLEARANCE ANALYSIS
// ============================================================================

// Measure clearance at a specific point
function measureClearance(point, pathDirection, modules, habitatStructure) {
  // Perpendicular direction
  const perpX = -pathDirection.z;
  const perpZ = pathDirection.x;
  
  let minClearanceLeft = Infinity;
  let minClearanceRight = Infinity;
  
  // Check distance to modules
  for (const module of modules) {
    const modulePos = module.position;
    const moduleSize = (module.userData && module.userData.size) || 1.5;
    const moduleRadius = moduleSize / 2;
    
    const toModuleX = modulePos.x - point.x;
    const toModuleZ = modulePos.z - point.z;
    const distance = Math.sqrt(toModuleX * toModuleX + toModuleZ * toModuleZ);
    const clearance = Math.max(0, distance - moduleRadius);
    
    // Determine side
    const side = toModuleX * perpX + toModuleZ * perpZ;
    if (side < 0) {
      minClearanceLeft = Math.min(minClearanceLeft, clearance);
    } else {
      minClearanceRight = Math.min(minClearanceRight, clearance);
    }
  }
  
  // Check distance to habitat boundary
  const distFromCenter = Math.sqrt(point.x * point.x + point.z * point.z);
  const boundaryDist = Math.max(0, habitatStructure.radius - distFromCenter - 0.3);
  
  if (minClearanceLeft === Infinity) minClearanceLeft = boundaryDist;
  if (minClearanceRight === Infinity) minClearanceRight = boundaryDist;
  
  // Total corridor width
  const corridorWidth = Math.min(
    minClearanceLeft + minClearanceRight,
    boundaryDist * 2
  );
  
  return Math.max(0, corridorWidth);
}

// Analyze path segment clearance
function analyzeSegment(startPoint, endPoint, modules, habitatStructure) {
  const dx = endPoint.x - startPoint.x;
  const dz = endPoint.z - startPoint.z;
  const length = Math.sqrt(dx * dx + dz * dz);
  
  if (length === 0) return { minWidth: MIN_PATH_WIDTH, passes: true };
  
  const direction = { x: dx / length, z: dz / length };
  let minWidth = Infinity;
  
  // Check clearance at 5 points along segment
  for (let i = 0; i <= 5; i++) {
    const t = i / 5;
    const checkPoint = {
      x: startPoint.x + dx * t,
      z: startPoint.z + dz * t
    };
    
    const width = measureClearance(checkPoint, direction, modules, habitatStructure);
    minWidth = Math.min(minWidth, width);
  }
  
  return {
    minWidth: minWidth === Infinity ? 100 : Math.min(minWidth, 100),
    passes: minWidth >= MIN_PATH_WIDTH
  };
}

// Analyze complete path
export function analyzePath(pathPoints, modules, habitatStructure) {
  if (!pathPoints || pathPoints.length < 2) {
    return {
      totalDistance: 0,
      totalSegments: 0,
      clearSegments: 0,
      narrowSegments: 0,
      minWidth: 0,
      passes: false,
      segments: []
    };
  }
  
  console.log('📊 Analyzing path clearance...');
  
  const segments = [];
  let totalDistance = 0;
  let clearCount = 0;
  let narrowCount = 0;
  let overallMinWidth = Infinity;
  
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const start = pathPoints[i];
    const end = pathPoints[i + 1];
    
    const dx = end.x - start.x;
    const dz = end.z - start.z;
    const segmentLength = Math.sqrt(dx * dx + dz * dz);
    
    const clearance = analyzeSegment(start, end, modules, habitatStructure);
    
    segments.push({
      start,
      end,
      length: segmentLength,
      clearance: clearance.minWidth,
      passes: clearance.passes
    });
    
    totalDistance += segmentLength;
    overallMinWidth = Math.min(overallMinWidth, clearance.minWidth);
    
    if (clearance.passes) {
      clearCount++;
    } else {
      narrowCount++;
    }
  }
  
  const result = {
    totalDistance,
    totalSegments: segments.length,
    clearSegments: clearCount,
    narrowSegments: narrowCount,
    minWidth: overallMinWidth === Infinity ? 100 : overallMinWidth,
    passes: narrowCount === 0,
    segments
  };
  
  console.log(`  ✓ Analysis complete:`);
  console.log(`    Distance: ${totalDistance.toFixed(2)}m`);
  console.log(`    Min width: ${result.minWidth.toFixed(2)}m`);
  console.log(`    Status: ${result.passes ? 'PASS ✅' : 'FAIL ❌'}`);
  
  return result;
}
