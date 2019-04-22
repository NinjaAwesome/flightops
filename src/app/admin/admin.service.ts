import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { saveAs } from 'file-saver';
import { FileUpload } from './fileupload';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private basePath = '/uploads';

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }
  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }): Observable<any> {

    return Observable.create(observer => {
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          // fail
          console.log(error);
        },
        () => {
          // success
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            observer.next({ data: downloadURL });
            observer.complete();
            // this.saveFileData(fileUpload);
          });
        }
      );
    })
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }

  addFlight(reference_id: string,
    ops_crew: string,
    pic_crew: string,
    fo_crew: string,
    ops_crew_name: string,
    pic_crew_name: string,
    fo_crew_name: string,
    aircraft: number,
    departure_airport: string,
    arrival_airport: string,
    departure_time: number,
    handler: string,
    dangerous: string,
    type: string,
    pax: string,
    cargo: string,
    liveLeg: string,
    positionFrom: string,
    positionTo: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/flight', {
        reference_id,
        ops_crew,
        pic_crew,
        fo_crew,
        ops_crew_name,
        pic_crew_name,
        fo_crew_name,
        aircraft,
        departure_airport,
        arrival_airport,
        departure_time,
        handler,
        dangerous,
        type,
        pax,
        cargo,
        liveLeg,
        positionFrom,
        positionTo
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  updateCrew(id: string,
    unavailableFrom: number,
    unavailableTo: number): Observable<any> {
    return Observable.create(observer => {
      this.http.put('/api/crew/update/' + id, {
        unavailableFrom,
        unavailableTo
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  sendMail(email: string,
    subject: string,
    message: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/mail/send-mail', {
        email,
        subject,
        message
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  updateTemplate(id: string,
    subject: string,
    message: string): Observable<any> {
    return Observable.create(observer => {
      this.http.put('/api/mail/update/' + id, {
        subject,
        message
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  addRoute(reference_id: string,
    route: string,
    ops_crew: string,
    pic_crew: string,
    fo_crew: string,
    ops_crew_name: string,
    pic_crew_name: string,
    fo_crew_name: string,
    aircraft: number,
    departure_airport: string,
    arrival_airport: string,
    handler: string,
    dangerous: string,
    paxCargo: string,
    pax: string,
    cargo: string,
    type: string,
    arrivaltime: number,
    departuretime: number,
    fuel: number,
    distance: number,
    fplan: object): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/route', {
        reference_id,
        route,
        ops_crew,
        pic_crew,
        fo_crew,
        ops_crew_name,
        pic_crew_name,
        fo_crew_name,
        aircraft,
        departure_airport,
        arrival_airport,
        handler,
        dangerous,
        paxCargo,
        pax,
        cargo,
        type,
        arrivaltime,
        departuretime,
        fuel,
        distance,
        fplan
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  addCrew(name: string,
    img_url: string,
    occupation: string,
    unavailableFrom: number,
    unavailableTo: number,
    p_email: string,
    s_email: string,
    p_phone: string,
    s_phone: string,
    licence: string,
    expiry: string,
    user_id: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/crew', {
        name,
        img_url,
        occupation,
        unavailableFrom,
        unavailableTo,
        p_email,
        s_email,
        p_phone,
        s_phone,
        licence,
        expiry,
        user_id
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  addSale(company_name: string,
    contact_name: string,
    contact_email: string,
    contact_phone: string,
    weight: string,
    dangerous: string,
    description: string,
    instructions: string,
    origin_airport: string,
    destination_airport: string,
    departure: number,
    reference_id: string,
    estimated_cost: string,
    price_charged: string, ): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/sale', {
        company_name,
        contact_name,
        contact_email,
        contact_phone,
        weight,
        dangerous,
        description,
        instructions,
        origin_airport,
        destination_airport,
        departure,
        reference_id,
        estimated_cost,
        price_charged,
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  addAircraft(registration: string,
    aircraftId: string,
    img_url: string,
    tow: string,
    fuel: string,
    pax: string,
    cargo: string,
    icao24: string,
    base: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/aircraft', {
        registration,
        aircraftId,
        img_url,
        tow,
        fuel,
        pax,
        cargo,
        icao24,
        base
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  addLicence(
    crew_id: string,
    licence: string,
    expiry: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/licence', {
        crew_id,
        licence,
        expiry
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  addAirport(
    name: string,
    iata_code: string,
    logo: string,
    longitude: number,
    latitude: number,
    phone_primary: string,
    phone_secondary: string,
    email_primary: string,
    email_secondary: string,
    monday_open: string,
    monday_close: string,
    tuesday_open: string,
    tuesday_close: string,
    wednesday_open: string,
    wednesday_close: string,
    thursday_open: string,
    thursday_close: string,
    friday_open: string,
    friday_close: string,
    saturday_open: string,
    saturday_close: string,
    sunday_open: string,
    sunday_close: string,
    runway_1: string,
    runway_1_diagram: string,
    runway_2: string,
    runway_2_diagram: string,
    runway_3: string,
    runway_3_diagram: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/airport', {
        name,
        iata_code,
        logo,
        longitude,
        latitude,
        phone_primary,
        phone_secondary,
        email_primary,
        email_secondary,
        monday_open,
        monday_close,
        tuesday_open,
        tuesday_close,
        wednesday_open,
        wednesday_close,
        thursday_open,
        thursday_close,
        friday_open,
        friday_close,
        saturday_open,
        saturday_close,
        sunday_open,
        sunday_close,
        runway_1,
        runway_1_diagram,
        runway_2,
        runway_2_diagram,
        runway_3,
        runway_3_diagram,
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  addHandler(
    name: string,
    iata_code: string,
    logo: string,
    phone_primary: string,
    phone_secondary: string,
    email_primary: string,
    email_secondary: string,
    monday_open: string,
    monday_close: string,
    tuesday_open: string,
    tuesday_close: string,
    wednesday_open: string,
    wednesday_close: string,
    thursday_open: string,
    thursday_close: string,
    friday_open: string,
    friday_close: string,
    saturday_open: string,
    saturday_close: string,
    sunday_open: string,
    sunday_close: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/handler', {
        name,
        iata_code,
        logo,
        phone_primary,
        phone_secondary,
        email_primary,
        email_secondary,
        monday_open,
        monday_close,
        tuesday_open,
        tuesday_close,
        wednesday_open,
        wednesday_close,
        thursday_open,
        thursday_close,
        friday_open,
        friday_close,
        saturday_open,
        saturday_close,
        sunday_open,
        sunday_close,
      }).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getAircrafts(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/aircraft/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getAirports(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/airport/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getHandlers(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/handler/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getCrews(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/crew/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getSale(id): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/sale/fetch/' + id).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getBriefing(route): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/aircraft/getBriefing/' + route).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getCrew(id): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/crew/fetch/' + id).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getCrewByUser(id): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/crew/fetchUser/' + id).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getNOTAM(id): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/aircraft/getNOTAM/' + id).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getCrewByOccupation(occupation): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/crew/fetchType/' + occupation).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getAircraft(id): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/aircraft/fetch/' + id).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getAirport(iata_code): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/airport/fetch/' + iata_code).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getLicences(crew_id): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/licence/fetch/' + crew_id).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getHandler(airport): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/handler/fetch/' + airport).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getHandlerDetails(handler): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/handler/fetchDetails/' + handler).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getSales(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/sale/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getUsers(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/auth/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  addUser(fullname: string, email: string, password: string, repeatPassword: string, role: string, occupation: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword,
        role,
        occupation
      }).subscribe((data: any) => {
        observer.next({ data: data.user });
        observer.complete();
      })
    });
  }
  route(data): Observable<any> {

    return Observable.create(observer => {
      this.http.post('/api/aircraft/createRoute', data).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getFplan(routeId): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/aircraft/getFplan/' + routeId).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getFlight(): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/flight/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getMovements(): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/route/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getMovement(id): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/route/fetch/' + id).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  downloadBriefing(route): Observable<any> {

    return Observable.create(observer => {
      var mediaType = 'application/pdf';
      this.http.get('/api/aircraft/downloadBriefing/' + route, {
        responseType: 'blob'
      }).subscribe((data: any) => {
        console.log(data)
        var blob = new Blob([data], { type: mediaType });
        saveAs(blob, route + '.pdf');
        observer.next({ data: data });
        observer.complete();
        console.log('not found')
      })
    });
  }
  getAircraftSchedule(aircraftId): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/route/fetchAircraft/' + aircraftId).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getOPSSchedule(ops): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/route/fetchOPS/' + ops).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getPICSchedule(pic): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/route/fetchPIC/' + pic).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getFOSchedule(fo): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/route/fetchFO/' + fo).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getAdminSchedule(): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/route/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getTemplates(): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/mail/fetch').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  longPoll(routeId): Observable<any> {

    return Observable.create(observer => {
      this.http.get('/api/aircraft/longpoll/' + routeId).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getChatByRoom(room) {
    return Observable.create(observer => {
      this.http.get('/api/chat/' + room).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
  getLocation(icao24) {
    return Observable.create(observer => {
      this.http.get('https://kininteractivesolutions:KinSolutions123@opensky-network.org/api/tracks/all?icao24=' + icao24 + '&time=0').subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }

  saveChat(data) {
    return Observable.create(observer => {
      this.http.post('/api/chat', data).subscribe((data: any) => {
        observer.next({ data: data });
        observer.complete();
      })
    });
  }
}
