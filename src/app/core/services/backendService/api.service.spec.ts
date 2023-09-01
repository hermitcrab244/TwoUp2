import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('APIService', () => {
  let service: APIService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [APIService],
    });
    service = TestBed.inject(APIService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send registration request', () => {
    const responseMock = { statis: 'success' };
    const username = 'test';
    const password = 'test';

    service.register(username, password).subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const req = httpTestingController.expectOne(
      `${service[`apiURL`]}/registration`
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush(responseMock);
  });

  it('should send login request', () => {
    const responseMock = { statis: 'success' };
    const username = 'test';
    const password = 'test';

    service.login(username, password).subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const req = httpTestingController.expectOne(`${service[`apiURL`]}/login`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush(responseMock);
  });

  it('should send game results', () => {
    const responseMock = { status: 'success' };
    const user_ID = 1;
    const username = 'test';
    const score = 10;

    service.endGame(user_ID, username, score).subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const req = httpTestingController.expectOne(`${service[`apiURL`]}/end`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ user_ID, username, score });

    req.flush(responseMock);
  });

  it('Should retrieve leaderboard data', () => {
    const responseMock = [
      { username: 'test1', score: 10 },
      { username: 'test2', score: 8 },
      { username: 'test3', score: 5 },
      { username: 'test4', score: 1 },
    ];

    service.leaderboard().subscribe((reponse) => {
      expect(reponse).toEqual(responseMock);
    });

    const req = httpTestingController.expectOne(
      `${service[`apiURL`]}/retrieve-scores`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(responseMock);
  });

  it('should update colour preference', () => {
    const responseMock = { status: 'success' };
    const colour_pref = 'default';
    const user_ID = 1;

    service.colourUpdate(colour_pref, user_ID).subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const req = httpTestingController.expectOne(
      `${service[`apiURL`]}/colour-update`
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ colour_pref, user_ID });

    req.flush(responseMock);
  });

  it('should retrieve user highest score', () => {
    const responseMock = { score: 10 };
    const username = 'test';

    service.userHighScore(username).subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const req = httpTestingController.expectOne(
      `${service[`apiURL`]}/user-highest-score?username=${username}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(responseMock);
  });
});
