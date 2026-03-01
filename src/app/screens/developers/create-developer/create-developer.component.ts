import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DeveloperService } from '../../../services/developer.service';
import { DialogService } from '../../../services/dialog.service';
import { SkillDto } from '../../../dto/skill.dto';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../../components/breadcrumb/breadcrumb.component';
import { DeveloperRequestDto } from '../../../dto/developer-request.dto';

@Component({
  selector: 'app-create-developer',
  templateUrl: './create-developer.component.html',
  styleUrls: ['./create-developer.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    BreadcrumbComponent,
  ],
  standalone: true,
})
export class CreateDeveloperComponent implements OnInit {
  form!: FormGroup;
  skills = signal<SkillDto[]>([]);
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Desenvolvedores', path: '/developers' },
    { label: 'Cadastrar Desenvolvedor' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private developerService: DeveloperService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadSkills();
    this.initForm();
  }

  loadSkills(): void {
    this.developerService.getSkills().subscribe({
      next: (skills) => this.skills.set(skills),
      error: () => {
        this.dialogService.error(
          'Erro',
          'Erro ao carregar habilidades. Tente recarregar a página.',
        );
      },
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      skillIds: [[], Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const request: DeveloperRequestDto = {
        name: this.form.value.name,
        email: this.form.value.email,
        skillIds: this.form.value.skillIds,
      };
      this.developerService.create(request).subscribe({
        next: async () => {
          const result = await this.dialogService.success(
            'Sucesso',
            'Desenvolvedor criado com sucesso!',
            'OK',
          );
          if (result) {
            this.router.navigate(['/developers']);
          }
        },
        error: (err) => {
          this.dialogService.error('Erro', err.error?.message || 'Erro ao criar desenvolvedor');
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/developers']);
  }
}
