import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import angular material
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrl: './typography.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCheckboxModule, FormsModule]
})
export class TypographyComponent {}
