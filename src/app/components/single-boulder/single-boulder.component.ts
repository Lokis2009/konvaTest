import {of as observableOf, Observable} from 'rxjs';
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppSettings} from '../../config/config';
import {CookieService} from 'ngx-cookie';
import {FileUploader, FileItem, ParsedResponseHeaders} from 'ng2-file-upload';

import {KonvaComponent} from 'ng2-konva';
import {ChangeDetectorRef} from '@angular/core';
import {ToolsService} from '../../tools.service';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-single-boulder',
  templateUrl: './single-boulder.component.html',
  styleUrls: ['./single-boulder.component.sass']
})
export class SingleBoulderComponent implements OnInit {
  appSettings = new AppSettings();
  private sub: any;
  routeId: number;
  routeInfo: any;
  headers: any;
  selectedImage: number;
  showUpload = false;
  edit = true;
  uploadUrl = this.appSettings.API_server + 'routes/images';
  pointsArr = [];
  circleArr = [];
  selectedLanguage = '';
  languages: string [] = [];
  climbers: any;
  firstAcsenderSearch = '';
  topoCreatorSearch = '';
  acenderEdit;
  topoCreatorEdit;
  showDropdown;
  touched = false;
  canvasHeight;
  canvasWidth;
  public zoomX;
  public zoomY;
  resPointsArr = [];
  @ViewChild('stage') stage: KonvaComponent;
  @ViewChild('layer') layer: KonvaComponent;
  @ViewChild('line') line: KonvaComponent;
  public uploader: FileUploader = new FileUploader({
    url: this.uploadUrl,
    itemAlias: 'images',
    autoUpload: true
  });
  public configLine = observableOf({
    points: this.pointsArr,
    stroke: 'red',
    strokeWidth: 2,
    lineJoin: 'round',
    draggable: false
  });
  public configStage;
  image;

  constructor(private route: ActivatedRoute,
              private _cookieService: CookieService,
              private ref: ChangeDetectorRef,
              private tools: ToolsService,
              private data: DataService) {
  }

  ngOnInit() {
    this.headers = this._cookieService.get('at');
    this.uploader.setOptions({authToken: this.headers});
    this.selectedImage = 0;
    this.routeInfo = {
      'name': 'Boulder',
      'difficulty': '1',
      'polygon': {
        'type': 'Point',
        'coordinates': [48.46710544497323, 35.05454197525978]
      },
      'id': 291,
      'country': 'Ukraine',
      'region': 'Dnipropetrovsk Oblast',
      'ticksCount': 0,
      'field': {
        'name': 'New foeld',
        'id': 915
      },
      'sector': {'name': 'New foeld', 'id': 680},
      'rock': {'name': 'New foeld', 'id': 271},
      'images': [{
        'url': 'https://my-ticks.s3.eu-central-1.amazonaws.com/places/d8e6d2a8-52f1-44a4-9cb7-b088cddc33e7.png',
        'coordinates': [{
          'coordinates': [[33.1851851851852, 139.9248434238],
            [78.2222222222222, 301.194154488518], [265.481481481481,
              182.613778705637], [303.407407407407, 391.315240083507],
            [517.224489795918, 769.548387096774], [71.5925925925926, 764.843423799582],
            [73.962962962963, 1085.01043841336]]
        }]
      }],
      'hasTick': false,
      'isFavorite': false,
      'rating': 0,
      'info': {
        'english': {'description': 'Description'},
        'french': {'description': ''}, 'german': {'description': ''},
        'spanish': {'description': ''}, 'norwegian': {'description': ''},
        'original': 'english'
      },
      'creator': {
        'name': 'Petia',
        'avatar': 'https://my-ticks.s3.eu-central-1.amazonaws.com/users/03ededc0-2c06-48b7-ae66-653c5a07ca18.png', 'surname': 'Zheliabov'
      },
      'index': 1,
      'firstAscenderText': null,
      'topoCreatorText': null,
      'firstAscender': null,
      'topoCreator': null
    };


    this.languages = this.tools.getLanguages(this.routeInfo.info);
    this.selectedLanguage = this.languages[0];
    this.routeInfo.info = this.tools.removeNull(this.routeInfo.info);
    if (this.routeInfo.firstAscender == null) {
      this.routeInfo.firstAscender = '';
    }
    if (this.routeInfo.topoCreator == null) {
      this.routeInfo.topoCreator = '';
    }
    this.configStage = observableOf({
      width: 200,
      height: 200,
    });
    this.resPointsArr = this.routeInfo.images[0].coordinates[0].coordinates;
    this.resPointsArr.forEach(point => {
      this.circleArr.push(this.buildAnchor(point[0] / 14, point[1] / 14));
    });
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.data.getUsersList().subscribe(res => {
      this.climbers = res;
    });
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(JSON.parse(response));
  }
  buildAnchor(x, y) {
    return observableOf({
      x: x,
      y: y,
      radius: 4,
      stroke: '#666',
      fill: 'red',
      strokeWidth: 1,
      draggable: true
    });
  }

  moveCircle(event, index) {
    this.edit = false;
    const mousePos = this.stage.getStage().pointerPos;
    mousePos.x = parseFloat(mousePos.x);
    mousePos.y = parseFloat(mousePos.y);
    this.pointsArr[index * 2] = mousePos.x;
    this.pointsArr[index * 2 + 1] = mousePos.y;
    this.line.getStage().setPoints(this.pointsArr);
    this.layer.getStage().draw();
  }

  prepareArrForFetch(arr) {
    this.pointsArr.length = 0;
    arr.forEach(item => {
      this.pointsArr.push(item[0] * this.zoomX, item[1] * this.zoomY);
    });
  }

  setPointer() {
    document.body.style.cursor = 'pointer';
  }

  defaultCursor() {
    document.body.style.cursor = 'default';
  }

  getCanvasWidth() {
    this.getZoom();
    const el: any = document.getElementById('mainImage');
    this.stage.getStage().width(el.width);
    this.stage.getStage().height(el.height);
    const circleDrawArr = this.stage.getStage().find('Circle');
    this.resPointsArr.forEach((item, index) => {
      circleDrawArr[index].setAttr('x', item[0] * this.zoomX);
      circleDrawArr[index].setAttr('y', item[1] * this.zoomY);
      circleDrawArr[index].draw();
    });
    this.prepareArrForFetch(this.resPointsArr);
    this.stage.getStage().draw();
  }

  getZoom() {
    const el: any = document.getElementById('mainImage');
    this.zoomX = el.width / el.naturalWidth;
    this.zoomY = el.height / el.naturalHeight;
  }

  prepareArrForSave(arr) {
    const changearr = [];
    for (let i = 0; i < arr.length; i = i + 2) {
      changearr.push([arr[i] / this.zoomX, arr[i + 1] / this.zoomY]);
    }
    return changearr;
  }
}



