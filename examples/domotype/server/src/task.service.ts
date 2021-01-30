import { TaskQueuer } from 'partially-shared-store/utils';

export class TaskService extends TaskQueuer {
  private static instance?: TaskService;

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }
}
