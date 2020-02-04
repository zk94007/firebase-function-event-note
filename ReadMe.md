
▶ Create Event Endpoint
  - Endpoint:  https://us-central1-talentproject-251200.cloudfunctions.net/createEvent
  - Param: start_time, end_time, title, description, author
  - Exra Param for EventNote: text
  - Return Value: 

    • Success(without EventNote): {"result":"success", "EventID":"..."}

    • Success(with EventNote): {"result":"success", "EventID":"...", "EventNoteID": "..."}

    • Failure: {"result":"failure", "message":"Please parse all fields required!"}

               {result: 'failure', message: 'Please parse start/end time correctly!'}

               {result: 'failure', message: "Database Operation Failed!"}
  - Example: 

    • https://us-central1-talentproject-251200.cloudfunctions.net/createEvent?start_time=12-4-1995 00:12:00&end_time=12-4-1995 00:13:00&title=class1&description=mathclass&author=talent

        Result:
        {
            "result": "success",
            "EventID": "M4ajDYN7PpM00Ts9cNm3"
        }
    • https://us-central1-talentproject-251200.cloudfunctions.net/createEvent?start_time=12-4-1995 00:12:00&end_time=12-4-1995 00:13:00&title=class1&description=mathclass&author=talent&text=hello

        Result:
        {
            "result": "success",
            "EventID": "vlnd0OAaiOeMcIFiApIN",
            "EventNoteID": "ECufPaUCnmJ5yVJCvAPb"
        }

▶ Update Event Endpoint
  - Endpoint:  https://us-central1-talentproject-251200.cloudfunctions.net/updateEvent
  - Param: id, start_time, end_time, title, description, author
  - Return Value: 

    • Success: {"result":"success", "EventID":"..."}

    • Failure: {"result":"failure", "message":"Please parse all fields required!"}

               {result: 'failure', message: "Invalid Event ID"}

               {result: 'failure', message: 'Please parse start/end time correctly!'}

               {result: 'failure', message: "Database Operation Failed!"}

  - Example: 

    • https://us-central1-talentproject-251200.cloudfunctions.net/updateEvent?start_time=12-4-1995 00:12:00&end_time=12-4-1995 00:13:00&title=class1&description=mathclass&author=talent&id=vlnd0OAaiOeMcIFiApIN

        Result:
        {
            "result": "success",
            "EventID": "vlnd0OAaiOeMcIFiApIN"
        }

▶ Delete Event Endpoint
  - Endpoint:  https://us-central1-talentproject-251200.cloudfunctions.net/deleteEvent
  - Param: id
  - Return Value: 

    • Success: {"result":"success", "EventID":"..."}

    • Failure: {"result":"failure", "message":"Please parse all fields required!"}

               {result: 'failure', message: "Invalid Event ID"}

               {result: 'failure', message: "Database Operation Failed!"}

  - Example: 

    • https://us-central1-talentproject-251200.cloudfunctions.net/deleteEvent?id=M4ajDYN7PpM00Ts9cNm3

        Result:
        {
            "result": "success",
            "EventID": "M4ajDYN7PpM00Ts9cNm3"
        }

▶ Create EventNote Endpoint
  - Endpoint:  https://us-central1-talentproject-251200.cloudfunctions.net/createEventNote
  - Param: eventID, text, author
  - Return Value: 

    • Success: {"result":"success", "EventNoteID":"..."}

    • Failure: {"result":"failure", "message":"Please parse all fields required!"}
       
               {result: 'failure', message: "Invalid Event ID"}

               {result: 'failure', message: "Database Operation Failed!"}

  - Example: 

    • https://us-central1-talentproject-251200.cloudfunctions.net/createEventNote?eventID=vlnd0OAaiOeMcIFiApIN&text=world&author=talent

        Result:
        {
            "result": "success",
            "EventNoteID": "nyePhuYAXbwz7H2rKPIF"
        }

▶ Update EventNote Endpoint
  - Endpoint:  https://us-central1-talentproject-251200.cloudfunctions.net/updateEventNote
  - Param: id, eventID, text, author
  - Return Value: 

    • Success: {"result":"success", "EventNoteID":"..."}

    • Failure: {"result":"failure", "message":"Please parse all fields required!"}

               {result: 'failure', message: "Invalid Event ID"}

               {result: 'failure', message: "Invalid EventNote ID"}

               {result: 'failure', message: "Database Operation Failed!"}

  - Example: 

    • https://us-central1-talentproject-251200.cloudfunctions.net/updateEventNote?id=NwkK81wlkuBFdxmJQ2GM&text=world1&author=talent&eventID=vlnd0OAaiOeMcIFiApIN

        Result:
        {
            "result": "success",
            "EventNoteID": "NwkK81wlkuBFdxmJQ2GM"
        }

▶ Delete EventNote Endpoint
  - Endpoint:  https://us-central1-talentproject-251200.cloudfunctions.net/deleteEventNote
  - Param: id
  - Return Value: 

    • Success: {"result":"success", "EventNoteID":"..."}

    • Failure: {"result":"failure", "message":"Please parse all fields required!"}

               {result: 'failure', message: "Invalid EventNote ID"}

               {result: 'failure', message: "Database Operation Failed!"}

  - Example: 

    • https://us-central1-talentproject-251200.cloudfunctions.net/deleteEventNote?id=NwkK81wlkuBFdxmJQ2GM

        Result:
        {
            "result": "success",
            "EventNoteID": "NwkK81wlkuBFdxmJQ2GM"
        }
