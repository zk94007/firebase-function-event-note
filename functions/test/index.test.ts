import { createEvent, updateEvent, deleteEvent, createEventNote, updateEventNote, deleteEventNote } from '../src/index';
import * as testinit from 'firebase-functions-test';
import * as chai from 'chai';
import 'mocha';
const assert = chai.assert;


const projectConfig = {
  projectId: 'talentproject-251200',
  databaseURL: "https://talentproject-251200.firebaseio.com"
};

const test = testinit(projectConfig, '../serviceAccountKey.json');


describe('Cloud Functions', () => {
    let EventID = "";
    let EventNoteID = "";
    before(() => {
    });
  
    after(() => {
      // Do cleanup tasks.
      test.cleanup();
      // Reset the database.
    });
  
    describe('CreateEvent & UpdateEvent', () => {
      
      it('createEvent should return a failure message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { start_time: '12-4-1995 00:12:00', end_time:'12-4-1995 00:13:00', description:'mathclass',author:'talent' } };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'failure');
            assert.equal(result.message, 'Please parse all fields required!');
            done();
          }
        };
        createEvent(req as any, res as any);
      });
      it('createEvent should return a failure message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { start_time: '12-4-1995 00:12:00', end_time:'12-3-1995 00:13:00', title:'class1', description:'mathclass',author:'talent' } };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'failure');
            assert.equal(result.message, 'Please parse start/end time correctly!');
            done();
          }
        };
        createEvent(req as any, res as any);
      });
      it('createEvent should return a success message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { start_time: '12-4-1995 00:12:00', end_time:'12-4-1995 00:13:00', title:'class1', description:'mathclass',author:'talent' } };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'success');
            assert.isNotNull(result.EventID);
            EventID = result.EventID;
            done();
          }
        };
        createEvent(req as any, res as any);
      });
      it('updateEvent should return a failure message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: {id: EventID, start_time: '12-4-1995 00:12:00', end_time:'12-4-1995 00:13:00'} };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'failure');
            assert.equal(result.message, 'Please parse all fields required!');
            done();
          }
        };
        updateEvent(req as any, res as any);
      });
      it('updateEvent should return a failure message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { id:EventID, start_time: '12-4-1995 00:12:00', end_time:'12-3-1995 00:13:00', title:'class1', description:'mathclass',author:'talent' } };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'failure');
            assert.equal(result.message, 'Please parse start/end time correctly!');
            done();
          }
        };
        updateEvent(req as any, res as any);
      });
      it('updateEvent should return a success message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { id:EventID, start_time: '12-4-1995 00:12:00', end_time:'12-4-1995 00:13:00', title:'class1', description:'mathclass1',author:'talent1' } };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'success');
            assert.isNotNull(result.EventID);
            done();
          }
        };
        updateEvent(req as any, res as any);
      });
    });
    describe('CreateEventNote & UpdateEventNote', () => {
      
      it('createEventNote should return a failure message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { eventID: EventID} };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'failure');
            assert.equal(result.message, 'Please parse all fields required!');
            done();
          }
        };
        createEventNote(req as any, res as any);
      });
      it('createEventNote should return a success message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { eventID: EventID, text: 'Hello!', author: 'talent' } };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'success');
            assert.isNotNull(result.EventNoteID);
            EventNoteID = result.EventNoteID;
            done();
          }
        };
        createEventNote(req as any, res as any);
      });
      
      it('updateEventNote should return a failure message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { } };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'failure');
            assert.equal(result.message, 'Please parse all fields required!');
            done();
          }
        };
        updateEventNote(req as any, res as any);
      });
      it('updateEventNote should return a success message', (done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: { id: EventNoteID,eventID: EventID, text: 'Hello!', author: 'talent1' } };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'success');
            assert.isNotNull(result.EventNoteID);
            done();
          }
        };
        updateEventNote(req as any, res as any);
      });
      
    });
    describe('deleteEventNote & deleteEvent', () => {
      it('deleteEventNote should return a failure message',(done) => {
        const req = { query: {}};
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'failure');
            assert.equal(result.message, 'Please parse all fields required!');
            done();
          }
        };
        deleteEventNote(req as any, res as any);
      });
      it('deleteEventNote should return a success message',(done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: {id: EventNoteID} };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'success');
            assert.isNotNull(result.EventNoteID);
            done();
          }
        };
        deleteEventNote(req as any, res as any);
      });
      it('deleteEvent should return a failure message',(done) => {
        const req = { query: {}};
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'failure');
            assert.equal(result.message, 'Please parse all fields required!');
            done();
          }
        };
        deleteEvent(req as any, res as any);
      });
      it('deleteEvent should return a success message',(done) => {
        // A fake request object, with req.query.text set to 'input'
        const req = { query: {id: EventID} };
        // A fake response object, with a stubbed redirect function which does some assertions
        const res = {
          json: (result: any) => {
            assert.equal(result.result, 'success');
            assert.isNotNull(result.EventID);
            done();
          }
        };
        deleteEvent(req as any, res as any);
      });
    });
  })