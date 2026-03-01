import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../components/breadcrumb/breadcrumb.component';
import { DeveloperService } from '../../services/developer.service';
import { DialogService } from '../../services/dialog.service';
import { DeveloperResponseDto } from '../../dto/developer-response.dto';
import { SkillDto } from '../../dto/skill.dto';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
  imports: [
    CommonModule,
    BreadcrumbComponent,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  standalone: true,
})
export class DevelopersComponent implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Desenvolvedores' },
  ];

  displayedColumns: string[] = ['id', 'name', 'email', 'skills', 'actions'];
  developers = signal<DeveloperResponseDto[]>([]);
  isLoading = signal(false);
  totalElements = signal(0);
  pageSize = signal(5);
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = signal(0);
  sortBy = signal('id');
  sortDir = signal<SortDirection>('asc');
  skills = signal<SkillDto[]>([]);

  // Filtros
  filterName = signal('');
  filterEmail = signal('');
  filterSkillIds = signal<number[]>([]);

  constructor(
    private developerService: DeveloperService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadSkills();
    this.loadDevelopers();
  }

  loadSkills(): void {
    this.developerService.getSkills().subscribe({
      next: (skills) => this.skills.set(skills),
      error: () => {
        this.dialogService.error('Erro', 'Erro ao carregar habilidades');
      },
    });
  }

  loadDevelopers(): void {
    this.isLoading.set(true);
    const params = {
      page: this.currentPage(),
      size: this.pageSize(),
      sortBy: this.sortBy(),
      sortDir: this.sortDir() === '' ? 'asc' : this.sortDir(),
      name: this.filterName(),
      email: this.filterEmail(),
      skillIds: this.filterSkillIds().length > 0 ? this.filterSkillIds() : undefined,
    };

    this.developerService.findAll(params).subscribe({
      next: (response) => {
        this.developers.set(response.content);
        this.totalElements.set(response.totalElements);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.dialogService.error(
          'Erro',
          'Erro ao carregar desenvolvedores. Tente recarregar a página.',
        );
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadDevelopers();
  }

  onSortChange(event: Sort): void {
    this.sortBy.set(event.active);
    this.sortDir.set((event.direction as SortDirection) || 'asc');
    this.currentPage.set(0);
    this.loadDevelopers();
  }

  onFilter(): void {
    this.currentPage.set(0);
    this.loadDevelopers();
  }

  clearFilters(): void {
    this.filterName.set('');
    this.filterEmail.set('');
    this.filterSkillIds.set([]);
    this.currentPage.set(0);
    this.loadDevelopers();
  }

  onEdit(developer: DeveloperResponseDto): void {
    this.router.navigate([`/developers/${developer.id}/edit`]);
  }

  onDelete(developer: DeveloperResponseDto): void {
    this.dialogService
      .confirm(
        'Confirmar Exclusão',
        `Tem certeza que deseja deletar o desenvolvedor "${developer.name}"?`,
        'Deletar',
        'Cancelar',
      )
      .then((result: boolean) => {
        if (result) {
          this.isLoading.set(true);
          this.developerService.delete(developer.id).subscribe({
            next: async () => {
              await this.dialogService.success('Sucesso', 'Desenvolvedor deletado com sucesso!');
              this.loadDevelopers();
            },
            error: (err) => {
              this.isLoading.set(false);
              this.dialogService.error(
                'Erro',
                err.error?.message || 'Erro ao deletar desenvolvedor',
              );
            },
          });
        }
      });
  }

  getSkillsDisplay(skills: any[]): string {
    return skills?.map((s) => s.name).join(', ') || '-';
  }
}
