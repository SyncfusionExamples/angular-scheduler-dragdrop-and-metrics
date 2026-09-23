import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { extend, closest } from '@syncfusion/ej2-base';
import { TimelineViewsService, AgendaService, GroupModel, EventSettingsModel, ResizeService, DragAndDropService,
  ScheduleModule, Schedule} from '@syncfusion/ej2-angular-schedule';
import { RowDDService, EditService, GridComponent, EditSettingsModel, RowDropSettingsModel, GridModule,} from '@syncfusion/ej2-angular-grids';


@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ TimelineViewsService, AgendaService, ResizeService, DragAndDropService, RowDDService, EditService],
    standalone: true,
    imports: [CommonModule, ScheduleModule, GridModule]
})
export class SchedulerComponent {
  
  @ViewChild('scheduleObj') public scheduleObj!: Schedule;
  @ViewChild('gridObj') public gridObj!: GridComponent;

  public sampleData: Record<string, any>[] = [];
  public selectedDate: Date = new Date(2026, 8, 23);
  public appointmentsLoaded: boolean = false;
  public loadTime: number = 0;
  public isLoading: boolean = false;
  public startTime: number = 0;
  public endTime: number = 0;
  public flag: boolean = false;
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Employees'],
  };
  public eventSettings: EventSettingsModel = {
    dataSource: this.sampleData,
  };
  public employeesData: Record<string, any>[] = [
    { text: 'Nancy', id: 1, color: '#df5286' },
    { text: 'Steven', id: 2, color: '#7fa900' },
    { text: 'Robert', id: 3, color: '#ea7a57' },
    { text: 'Smith', id: 4, color: '#5978ee' },
    { text: 'Michael', id: 5, color: '#00bdae' },
  ];
  public gridData: Record<string, any>[] = [
    { Task: 'Prepare customer proposal', Duration: '3 Hours', Priority: 'High' },
    { Task: 'Schedule product demo', Duration: '1 Hour', Priority: 'High' },
    { Task: 'Send product documentation', Duration: '30 Minutes', Priority: 'Medium' },
    { Task: 'Prepare pricing quote', Duration: '2 Hours', Priority: 'High' },
    { Task: 'Follow-up call with client', Duration: '30 Minutes', Priority: 'Medium' },
    { Task: 'Technical requirements analysis', Duration: '4 Hours', Priority: 'High' },
    { Task: 'Create implementation timeline', Duration: '2 Hours', Priority: 'High' },
    { Task: 'Prepare ROI analysis', Duration: '3 Hours', Priority: 'Medium' },
    { Task: 'Conduct product walkthrough', Duration: '1 Hour', Priority: 'High' },
    { Task: 'Negotiate contract terms', Duration: '2 Hours', Priority: 'High' },
  ];
  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
  };
  public rowDropSettings: RowDropSettingsModel = { targetID: 'Schedule' };

  private presaleAppointmentTypes: string[] = [
    'Customer Discovery Call',
    'Product Demonstration',
    'Technical Consultation',
    'Pricing Discussion',
    'Implementation Planning',
    'Contract Negotiation',
    'ROI Analysis Review',
    'Stakeholder Presentation',
    'Solution Design Session',
    'Follow-up Meeting',
    'Executive Briefing',
    'Requirements Gathering',
    'Integration Planning',
    'Training Session',
    'Support Setup Meeting',
  ];

  public loadAppointments(): void {
    this.isLoading = true;
    this.loadTime = 0;
    this.flag = true;
    
    this.startTime = new Date().getTime();

    this.sampleData = this.generateAppointments();
    this.eventSettings.dataSource = this.sampleData;
    this.scheduleObj.eventSettings.dataSource = this.sampleData;
    
    this.scheduleObj.refresh();
  }

  private generateAppointments(): Record<string, any>[] {
    const appointments: Record<string, any>[] = [];
    const baseDate = new Date(2026, 8, 23);
    let appointmentId = 1;

    const timeSlots = [
      { start: 6, end: 8 },    // 6-8 AM
      { start: 8, end: 10 },   // 8-10 AM
      { start: 10, end: 12 },  // 10 AM-12 PM
      { start: 12, end: 14 },  // 12-2 PM
      { start: 14, end: 16 },  // 2-4 PM
      { start: 16, end: 18 },  // 4-6 PM
    ];

    for (let i = 0; i < 1000; i++) {
      const randomEmployee = (i % 5) + 1;
      const randomTypeIndex = Math.floor(Math.random() * this.presaleAppointmentTypes.length);
      const appointmentType = this.presaleAppointmentTypes[randomTypeIndex];
      const customerName = `Customer ${Math.floor(i / 50) + 1}`;
      
      const dayOffset = Math.floor(i / 100); // Changes day every 100 appointments
      const timeSlotIndex = Math.floor((i % 100) / 17); // Cycle through time slots
      const selectedSlot = timeSlots[Math.min(timeSlotIndex, timeSlots.length - 1)];
      
      const startDate = new Date(baseDate);
      startDate.setDate(baseDate.getDate() + dayOffset);
      
      const randomMinutes = Math.floor(Math.random() * 60);
      const randomStartHour = selectedSlot.start + Math.floor(Math.random() * (selectedSlot.end - selectedSlot.start));
      startDate.setHours(randomStartHour, randomMinutes, 0, 0);
      
      const durationOptions = [15, 30, 45, 60];
      const durationMinutes = durationOptions[Math.floor(Math.random() * durationOptions.length)];
      
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + durationMinutes);

      appointments.push({
        Id: appointmentId++,
        Subject: `${appointmentType} - ${customerName}`,
        StartTime: startDate,
        EndTime: endDate,
        TaskId: randomEmployee,
      });
    }

    return appointments;
  }

  public calculateEventDuration(startTime: Date, endTime: Date): string {
    const durationInMilliseconds: number = endTime.getTime() - startTime.getTime();
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return durationInHours + ' Hours';
  }

  public handleDragStop(args: any): void {
    if (closest(args.event.target, '#Grid')) {
      this.scheduleObj.deleteEvent(args.data.Id as string);
      const startTime = new Date(args.data.StartTime as string);
      const endTime = new Date(args.data.EndTime as string);
      const formattedDuration = this.calculateEventDuration(startTime, endTime);
      const gridRecord = {
        Task: args.data.Subject,
        Duration: formattedDuration,
      };
      this.gridObj.addRecord(gridRecord);
    }
  }

  public onRowDrag(event: any): void {
    event.cancel = true;
  }

  public onRowDrop(args: any): void {
    args.cancel = true;
    const scheduleElement = closest(args.target, '.e-content-wrap');
    if (scheduleElement && args.target.classList.contains('e-work-cells')) {
      const cellData = this.scheduleObj.getCellDetails(args.target);
      const groupIndex = cellData.groupIndex ?? 0;
      const resourceDetails = this.scheduleObj.getResourcesByIndex(groupIndex);
      const durationStr = args.data[0].Duration;
      const durationHours = parseInt(durationStr.split(' ')[0], 10);
      const startTime = new Date(cellData.startTime);
      const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);
      const eventData = {
        Id: Number(this.scheduleObj.getEventMaxID()) + 1,
        Subject: args.data[0].Task,
        StartTime: startTime,
        EndTime: endTime,
        TaskId: resourceDetails.resourceData['id'],
      };
      this.scheduleObj.addEvent(eventData);
      this.gridObj.deleteRecord(args.data[0]);
    }
  }

  public onDataBound(): void {
    if (this.flag && this.startTime) {
      this.endTime = new Date().getTime();
      this.loadTime = this.endTime - this.startTime;
      this.flag = false;
      this.appointmentsLoaded = true;
      this.isLoading = false;
    }

    let resourceDataCounter = 0;
    const cells = this.scheduleObj.element.querySelectorAll('.e-resource-cells .e-resource-text');
    cells.forEach((cell: any) => {
      const workcells = document.querySelector('.e-work-cells');
      if (!workcells) return;
      const timestamp = Number(workcells.getAttribute('data-date'));
      const startDate = new Date(timestamp);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      const events = this.scheduleObj.getEvents(startDate, endDate, true);
      const dataSource = this.scheduleObj.resourceCollection[0].dataSource;
      if (Array.isArray(dataSource)) {
        if (resourceDataCounter < dataSource.length) {
          resourceDataCounter++;
        }
        const resourceEvents = events.filter((event: any) => event.TaskId === resourceDataCounter);
        const currentText = (cell as HTMLElement).innerText;
        const eventCount = resourceEvents.length;
        const resourceName = currentText.split('(')[0].trim();
        (cell as HTMLElement).innerText = resourceName + ' (' + eventCount + ')';
      }
    });
  }
}
