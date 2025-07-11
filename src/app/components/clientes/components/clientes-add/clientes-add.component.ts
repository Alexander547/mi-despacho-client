import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ClientesAddComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
