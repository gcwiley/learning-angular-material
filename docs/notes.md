Edit mode: When an 'id' parameter is present in the route, it fetches the corresponding film data and populates the form fields with the existing data

Create Mode: when there's no 'id' parameter, it sets the component to 'create' mode, presumably leaving the form fields empty or with default values for creating a new film. This is a common pattern in Angular applications when building forms that can both edit and create new data.

Why use CanActivateFn

function guard: the suggested code refactors the class-based AuthGuard into a function route guard 'authGuard'. Functional guards are the recommended approach in modern angular as they are simple, more tree-shakable, and dont require the class boilerplate.

