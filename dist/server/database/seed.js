import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  console.log('🌱 Seeding database...');
  // Create sample projects for development
  const project1 = await prisma.project.upsert({
    where: { path: '/home/oga/www/BMAD-Org/bmad-method-perso' },
    update: {},
    create: {
      name: 'BMAD Visual Studio',
      path: '/home/oga/www/BMAD-Org/bmad-method-perso',
      config: JSON.stringify({
        core: { version: '6.0.0-alpha.0' },
        bmm: { communication_language: 'francais' },
        bmb: { enabled: true },
        cis: { enabled: true },
      }),
      manifest: JSON.stringify({
        installation: {
          version: '6.0.0-alpha.0',
          installDate: '2025-10-13T15:39:35.354Z',
        },
        modules: ['core', 'bmm', 'bmb', 'cis'],
        ides: ['cursor', 'claude-code', 'codex', 'gemini'],
      }),
      modules: JSON.stringify(['core', 'bmm', 'bmb', 'cis']),
      status: 'active',
    },
  });
  console.log(`✅ Created project: ${project1.name}`);
  // Create sample workflow executions
  const workflow1 = await prisma.workflowExecution.upsert({
    where: {
      id: 'sample-workflow-1',
    },
    update: {},
    create: {
      projectId: project1.id,
      workflowId: 'document-project',
      workflowName: 'Document Project',
      status: 'completed',
      parameters: JSON.stringify({ mode: 'deep_scan' }),
      results: JSON.stringify({
        success: true,
        filesProcessed: 45,
        generatedDocs: ['PRD.md', 'solution-architecture.md'],
      }),
      startedAt: new Date('2025-10-14T10:00:00Z'),
      completedAt: new Date('2025-10-14T10:15:00Z'),
      durationMs: 900000,
    },
  });
  console.log(`✅ Created workflow execution: ${workflow1.workflowName}`);
  // Create sample agent configurations
  const agent1 = await prisma.agentConfiguration.upsert({
    where: {
      id: 'sample-agent-1',
    },
    update: {},
    create: {
      projectId: project1.id,
      agentId: 'bmad/bmm/agents/dev',
      agentName: 'Developer Agent',
      config: JSON.stringify({
        role: 'Senior Implementation Engineer',
        communication_style: 'Succinct, checklist-driven',
      }),
      isEnabled: true,
      usageCount: 5,
    },
  });
  console.log(`✅ Created agent configuration: ${agent1.agentName}`);
  // Create sample IDE connections
  const ide1 = await prisma.iDEConnection.upsert({
    where: {
      id: 'sample-ide-1',
    },
    update: {},
    create: {
      projectId: project1.id,
      ideType: 'cursor',
      connectionConfig: JSON.stringify({
        apiKey: 'configured',
        workspace: '/home/oga/www/BMAD-Org/bmad-method-perso',
      }),
      isConnected: true,
      connectionStatus: 'connected',
      lastHeartbeat: new Date(),
    },
  });
  console.log(`✅ Created IDE connection: ${ide1.ideType}`);
  // Create sample event logs
  const event1 = await prisma.eventLog.upsert({
    where: {
      id: 'sample-event-1',
    },
    update: {},
    create: {
      projectId: project1.id,
      eventType: 'workflow_started',
      eventData: JSON.stringify({
        workflowId: 'dev-story',
        storyId: '1.2',
        storyTitle: 'API Routes',
      }),
      source: 'WorkflowService',
      timestamp: new Date('2025-10-15T08:30:00Z'),
    },
  });
  console.log(`✅ Created event log: ${event1.eventType}`);
  console.log('🎉 Database seeded successfully!');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
//# sourceMappingURL=seed.js.map
