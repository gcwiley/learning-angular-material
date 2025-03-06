import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// this interface is used for components that need to confirm wheather they can be deactivated
// e.g. navigating away from the component
// a component implementing this interface would handle the logic wheather or not it's safe to leave
// the current view, such as propting the user to save changes
export interface CanComponentDeactivate {
   canDeactivate(): Observable<boolean> | boolean;
}

// this guard checks if a component implements a specific deactivation method. If so, it delegates the decision to that method; otherwise it all allows deactivation by default. this pattern is common in angular routing to handle scenarioes where you want to confirm unsaved changes or perform other checks before leaving a component.
@Injectable({
   providedIn: 'root',
})
export class CanDeactivateGuardService {
   public canDeactivate(component: CanComponentDeactivate): boolean | Observable<boolean> {
      return component.canDeactivate ? component.canDeactivate() : true;
   }
}
