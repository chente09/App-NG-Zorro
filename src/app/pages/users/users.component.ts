import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RegistersService, Register } from '../../services/registers/registers.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NzTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  registers: Register[] = [];
  constructor(private registersService: RegistersService) {}

  ngOnInit(): void {  
    this.getRegisters();
  }

  getRegisters(): void{
    this.registersService.getRegisters().subscribe(rs=>this.registers=rs);
  }
}
