import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ShopComponent } from './shop.component';
import { FillingPopularityChartComponent } from './filling-popularity-chart/filling-popularity-chart.component';
import { DumplingComponent } from './dumpling/dumpling.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // To mock animations

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let liveAnnouncerSpy: jasmine.SpyObj<LiveAnnouncer>;

  beforeEach(async () => {
    const announcerSpy = jasmine.createSpyObj('LiveAnnouncer', ['announce']);

    await TestBed.configureTestingModule({
      declarations: [
        ShopComponent,
        FillingPopularityChartComponent, // Declare the chart component
        DumplingComponent,               // Declare other used components
        ColorPickerComponent
      ],
      imports: [
        FormsModule,
        MatCardModule,
        MatListModule,
        MatSliderModule,
        NoopAnimationsModule // Use NoopAnimationsModule to avoid issues with animations in tests
      ],
      providers: [
        { provide: LiveAnnouncer, useValue: announcerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    liveAnnouncerSpy = TestBed.inject(LiveAnnouncer) as jasmine.SpyObj<LiveAnnouncer>;
    fixture.detectChanges(); // This calls ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fillingCounts in ngOnInit', () => {
    // ngOnInit is called by fixture.detectChanges() in the beforeEach block
    expect(component.fillingCounts).toBeDefined();
    component.fillings.forEach(filling => {
      expect(component.fillingCounts[filling]).toBe(0);
    });
  });

  it('should increment fillingCounts in fauxPurchase', () => {
    component.selectedFillings = [component.fillings[0], component.fillings[1]];
    component.quantity = 2;
    component.color = 'blue';

    component.fauxPurchase();

    expect(component.fillingCounts[component.fillings[0]]).toBe(1);
    expect(component.fillingCounts[component.fillings[1]]).toBe(1);
    // Ensure other fillings remain 0
    if (component.fillings.length > 2) {
      expect(component.fillingCounts[component.fillings[2]]).toBe(0);
    }

    // Purchase again with one of the same fillings
    component.selectedFillings = [component.fillings[0]];
    component.fauxPurchase();
    expect(component.fillingCounts[component.fillings[0]]).toBe(2);
    expect(component.fillingCounts[component.fillings[1]]).toBe(1); // This should remain 1
  });

  it('should announce purchase with LiveAnnouncer', () => {
    component.selectedFillings = [component.fillings[0]];
    component.quantity = 1;
    component.color = 'green';
    const expectedAnnouncement = `Purchase 1 ${component.fillings[0]}dumplings in the color green!`;

    component.fauxPurchase();

    expect(liveAnnouncerSpy.announce).toHaveBeenCalledWith(expectedAnnouncement);
  });

  it('should change color', () => {
    const newColor = 'red';
    component.changeColor(newColor);
    expect(component.color).toBe(newColor);
  });

  // Test for counter method (optional, as it's simple)
  it('counter should return an array of the specified length', () => {
    const count = 5;
    const result = component.counter(count);
    expect(result.length).toBe(count);
  });
});
