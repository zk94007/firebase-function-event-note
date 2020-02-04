import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

export const createEvent = functions.https.onRequest(async (req, res) => {
    // Params for Event
    const { start_time, end_time, title, description, author } = req.query;

    if ( !start_time || !end_time || !title || !description || !author) {
        res.json({result: 'failure', message: 'Please parse all fields required!'});
    } else if ( isNaN(Date.parse(start_time)) || isNaN(Date.parse(end_time)) || (Date.parse(start_time) > Date.parse(end_time))) {
        res.json({result: 'failure', message: 'Please parse start/end time correctly!'});
    } else {
        // Params for Event Notes
        const { text } = req.query;
        // Current Datetime
        const time_now = new Date(Date.now());
        // Add to events table
        try {
            const EventResult = await admin.firestore().collection('events').add({
                start_time: start_time,
                end_time: end_time,
                title: title,
                description: description,
                createdBy: author,
                createdAt: time_now,
                updatedBy: author,
                updatedAt: time_now
            });
            if (text) {
                // Add to EventNote table
                const EventNoteResult = await admin.firestore().collection('eventnotes').add({
                    eventID: EventResult.id,
                    text: text,
                    createdBy: author,
                    createdAt: time_now
                });
                res.json({result: 'success', EventID: EventResult.id, EventNoteID: EventNoteResult.id});
            } else {
                res.json({result: 'success', EventID: EventResult.id});
            }
        }
        catch(error) {
            res.json({result: 'failure', message: "Database Operation Failed!"});
        }
    }
});
export const updateEvent = functions.https.onRequest(async (req, res) => {
    // Params
    const { start_time, end_time, title, description, author, id } = req.query;
    if (!start_time || !end_time || !title || !description || !author || !id) {
        res.json({result: 'failure', message: 'Please parse all fields required!'});
    } else if ( isNaN(Date.parse(start_time)) || isNaN(Date.parse(end_time)) || (Date.parse(start_time) > Date.parse(end_time))) {
        res.json({result: 'failure', message: 'Please parse start/end time correctly!'});
    } else {
        const eventRef = admin.firestore().collection('events').doc(id);
        const eventDoc = await eventRef.get();
        if (!eventDoc.exists) {
            res.json({result: 'failure', message: "Invalid Event ID"});
        } else {
            // Current Datetime
            const time_now = new Date(Date.now());
            // Update to events table
            try {
                await eventRef.update({
                    start_time: start_time,
                    end_time: end_time,
                    title: title,
                    description: description,
                    updatedBy: author,
                    updatedAt: time_now
                });
                // Send back a message that we've succesfully updated Event
                res.json({result: 'success', EventID: id});
            }
            catch(error) {
                res.json({result: 'failure', message: "Database Operation Failed!"});
            }
        }
    }
}); 
export const deleteEvent = functions.https.onRequest(async (req, res) => {
    // Params
    const { id } = req.query;
    if (!id) {
        res.json({result: 'failure', message: 'Please parse all fields required!'});
    } else {
        const eventRef = admin.firestore().collection('events').doc(id);
        const eventDoc = await eventRef.get();
        if (!eventDoc.exists) {
            res.json({result: 'failure', message: "Invalid Event ID"});
        } else {
            try {
                // Delete from events table
                await eventRef.delete();
                // Find all eventnotes with this id
                const snapshot = await admin.firestore().collection('eventnotes').where('eventID', '==', id).get();
                if (!snapshot.empty) {
                    // Delete all related eventnotes
                    snapshot.forEach(doc => {
                        const result = doc.ref.delete();
                        console.log(result);
                    });
                }
                // Send back a message that we've succesfully deleted Event
                res.json({result: 'success', EventID: id});
            }
            catch(error) {
                res.json({result: 'failure', message: "Database Operation Failed!"});
            }
        }
    }
}); 

export const createEventNote = functions.https.onRequest(async (req, res) => {
    // Params for Event Notes
    const { text, author, eventID } = req.query;
    if (!eventID || !text || !author) {
        res.json({result: 'failure', message: 'Please parse all fields required!'});
    } else {
        const eventDoc = await admin.firestore().collection('events').doc(eventID).get();
        if (!eventDoc.exists) {
            res.json({result: 'failure', message: "Invalid Event ID"});
        } else {
            try {
                // Current Datetime
                const time_now = new Date(Date.now());
                // Add to EventNote table
                const EventNoteResult = await admin.firestore().collection('eventnotes').add({
                    eventID: eventID,
                    text: text,
                    createdBy: author,
                    createdAt: time_now
                });
                res.json({result: 'success', EventNoteID: EventNoteResult.id});
            }
            catch(error) {
                res.json({result: 'failure', message: "Database Operation Failed!"});
            }
        }
    }
});
export const updateEventNote = functions.https.onRequest(async (req, res) => {
    // Params
    const { text, author, id, eventID } = req.query;
    if (!id || !text || !author || !eventID) {
        res.json({result: 'failure', message: 'Please parse all fields required!'});
    } else {
        const eventDoc = await admin.firestore().collection('events').doc(eventID).get();
        const eventNoteRef = admin.firestore().collection('eventnotes').doc(id);
        const eventNoteDoc = await eventNoteRef.get();
        if (!eventDoc.exists) {
            res.json({result: 'failure', message: "Invalid Event ID"});
        } else if (!eventNoteDoc.exists) {
            res.json({result: 'failure', message: "Invalid EventNote ID"});
        } else {
            // Current Datetime
            const time_now = new Date(Date.now());
            // Update to eventnotes table
            try {
                await eventNoteRef.update({
                    eventID: eventID,
                    text: text,
                    createdBy: author,
                    createdAt: time_now
                });
                // Send back a message that we've succesfully updated EventNotes
                res.json({result: 'success', EventNoteID: id});
            }
            catch(error) {
                res.json({result: 'failure', message: "Database Operation Failed!"});
            }
        }
    }
}); 
export const deleteEventNote = functions.https.onRequest(async (req, res) => {
    // Params
    const { id } = req.query;
    if (!id ) {
        res.json({result: 'failure', message: 'Please parse all fields required!'});
    } else {
        const eventNoteRef = admin.firestore().collection('eventnotes').doc(id);
        const eventNoteDoc = await eventNoteRef.get();
        if (!eventNoteDoc.exists) {
            res.json({result: 'failure', message: "Invalid EventNote ID"});
        } else {
            try {
                // Delete from eventnotes table
                await eventNoteRef.delete();
                // Send back a message that we've succesfully deleted EventNotes
                res.json({result: 'success', EventNoteID: id});
            }
            catch(error) {
                res.json({result: 'failure', message: "Database Operation Failed!"});
            }
        }
    }
}); 