import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, ChartModule],
})
export class DashboardComponent implements OnInit {
  barChartData!: ChartConfiguration<'bar'>['data'];
  lineChartData!: ChartConfiguration<'line'>['data'];
  donutChartData!: ChartConfiguration<'doughnut'>['data'];
  constructor() {}

  ngOnInit() {
    this.barChartData = {
      labels: ['Civil', 'Penal', 'Laboral', 'Familiar'],
      datasets: [
        {
          label: 'Expedientes por Tipo',
          data: [25, 15, 40, 10],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
        },
      ],
    };

    this.lineChartData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
      datasets: [
        {
          label: 'Casos nuevos',
          data: [12, 19, 3, 5, 8],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
      ],
    };

    this.donutChartData = {
      labels: ['Activos', 'Finalizados', 'En espera'],
      datasets: [
        {
          data: [60, 25, 15],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        },
      ],
    };
  }
}
