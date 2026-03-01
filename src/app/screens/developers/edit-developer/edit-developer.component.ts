import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DeveloperService } from '../../../services/developer.service';
import { DialogService } from '../../../services/dialog.service';
import { SkillDto } from '../../../dto/skill.dto';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../../components/breadcrumb/breadcrumb.component';
import { DeveloperRequestDto } from '../../../dto/developer-request.dto';

@Component({
  selector: 'app-edit-developer',
  templateUrl: './edit-developer.component.html',
  styleUrls: ['./edit-developer.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BreadcrumbComponent,
  ],
  standalone: true,
})
export class EditarDeveloperComponent implements OnInit {
  form!: FormGroup;
  skills = signal<SkillDto[]>([]);
  isLoading = signal(true);
  developerId: number | null = null;
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Desenvolvedores', path: '/developers' },
    { label: 'Editar Desenvolvedor' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private developerService: DeveloperService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.developerId = params['id'];
      if (this.developerId) {
        this.loadData();
      } else {
        this.dialogService.error('Erro', 'ID do desenvolvedor não informado');
        this.router.navigate(['/developers']);
      }
    });
  }

  loadData(): void {
    if (!this.developerId) return;

    this.isLoading.set(true);
    forkJoin({
      skills: this.developerService.getSkills(),
      developer: this.developerService.findById(this.developerId),
    }).subscribe({
      next: (data) => {
        this.skills.set(data.skills);
        this.initForm(data.developer);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.dialogService.error('Erro', 'Erro ao carregar dados');
        this.router.navigate(['/developers']);
      },
    });
  }

  initForm(developer?: any): void {
    if (developer) {
      this.form = this.formBuilder.group({
        name: [
          developer.name,
          [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
        ],
        email: [developer.email, [Validators.required, Validators.email]],
        skillIds: [developer.skills?.map((s: SkillDto) => s.id) || [], Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        skillIds: [[], Validators.required],
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.developerId) {
      const request: DeveloperRequestDto = {
        name: this.form.value.name,
        email: this.form.value.email,
        skillIds: this.form.value.skillIds,
      };
      this.developerService.update(this.developerId, request).subscribe({
        next: async () => {
          const result = await this.dialogService.success(
            'Sucesso',
            'Desenvolvedor atualizado com sucesso!',
            'OK',
          );
          if (result) {
            this.router.navigate(['/developers']);
          }
        },
        error: (err) => {
          this.dialogService.error('Erro', err.error?.message || 'Erro ao atualizar desenvolvedor');
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/developers']);
  }
}
