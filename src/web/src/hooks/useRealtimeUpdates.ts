import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateExecution, updateExecutionProgress } from '../stores/workflowsSlice';
import { RootState } from '../stores';

export const useRealtimeUpdates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to Server-Sent Events
    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'workflow-started': {
            dispatch(updateExecution(data.data));
            break;
          }

          case 'workflow-completed': {
            dispatch(updateExecution(data.data));
            break;
          }

          case 'workflow-progress': {
            dispatch(
              updateExecutionProgress({
                executionId: data.data.executionId,
                progress: data.data.progress,
                currentStep: data.data.currentStep,
                output: data.data.output,
              }),
            );
            break;
          }

          case 'project-updated': {
            // Handle project updates if needed
            break;
          }

          case 'agent-activated': {
            // Handle agent updates if needed
            break;
          }

          default: {
            console.log('Unhandled event type:', data.type);
          }
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, [dispatch]);
};
