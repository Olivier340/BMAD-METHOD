// Simple test to verify ProjectService functionality
const { ProjectService } = require('../ProjectService');
const { initDatabase } = require('../../database');

async function runSimpleTest() {
  try {
    console.log('🚀 Starting ProjectService simple test...');

    // Initialize database
    await initDatabase();
    console.log('✅ Database initialized');

    const projectService = new ProjectService();

    // Test 1: Create a test project
    console.log('📝 Creating test project...');
    const testProject = await projectService.createProject({
      name: 'Test Project Simple',
      path: '/test/simple/path',
    });
    console.log('✅ Test project created:', testProject.id);

    // Test 2: Set active project
    console.log('🎯 Setting active project...');
    await projectService.setActiveProject(testProject.id, 'test-user');
    console.log('✅ Active project set');

    // Test 3: Get active project
    console.log('🔍 Getting active project...');
    const activeProject = await projectService.getActiveProject('test-user');
    console.log('✅ Active project retrieved:', activeProject?.name);

    // Test 4: Switch to project
    console.log('🔄 Switching project...');
    const switchedProject = await projectService.switchToProject(testProject.id, 'test-user');
    console.log('✅ Project switched:', switchedProject.name);

    // Test 5: Navigation history
    console.log('📚 Getting navigation history...');
    const history = await projectService.getProjectNavigationHistory('test-user', 5);
    console.log('✅ Navigation history length:', history.length);

    // Test 6: Clear active project
    console.log('🗑️ Clearing active project...');
    await projectService.clearActiveProject('test-user');
    const clearedActive = await projectService.getActiveProject('test-user');
    console.log('✅ Active project cleared:', clearedActive === null);

    console.log('🎉 All tests passed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runSimpleTest();
