import { HttpClient } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapService } from 'src/app/services/map.service';
import mockedHttpClient from 'src/app/mocked/mocked-services/mocked-http.service';
import mockedMapService from 'src/app/mocked/mocked-services/mocked-map.service';

import { MapComponent } from './map.component';

xdescribe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent,
      ],
      providers: [
        { provide: HttpClient, useValue: mockedHttpClient },
        { provide: MapService, useValue: mockedMapService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
