export enum MessageCode {
  GET_EMPLOYEE_BY_ID_ERROR = 'messageService.message.employee.getByIdError',
  DELETE_EMPLOYEE_ERROR = 'messageService.message.employee.deletingError',
  POST_EMPLOYEE_ERROR = 'messageService.message.employee.creatingError',
  PUT_EMPLOYEE_ERROR = 'messageService.message.employee.updatingError',
  GET_ALL_EMPLOYEES = 'messageService.message.employee.getAllEmployees',
  GET_ALL_EMPLOYEES_ERROR = 'messageService.message.employee.getAllEmployees.fetchingError',
  GET_ALL_MANAGERS = 'messageService.message.getAllManagers',
  GET_ALL_PROJECTS = 'messageService.message.project.getAllProjects',
  GET_ALL_PROJECTS_SUCCESS = 'messageService.message.project.onComplete',
  GET_ALL_PROJECTS_ERROR = 'messageService.message.project.fetchingError',
  GET_ALL_SKILLS_ERROR = 'messageService.message.skill.fetchingError',
  GET_ALL_SKILLS_SUCCESS = 'messageService.message.skill.onComplete',
}
