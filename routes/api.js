/*
*
*
*       Complete the API routing below
*
*
*/

/*
* MongoDB JSON Document Issues Object Format
* {
*   "_id": "5871dda29faedc3491ff93bb",
*   "project_title": "api-test-project"
*   "issue_title":"Fix error in posting data",
*   "issue_text":"When we post data it has an error.",
*   "created_on":"2017-01-08T06:35:14.240Z",
*   "updated_on":"2017-01-08T06:35:14.240Z",
*   "created_by":"Joe",
*   "assigned_to":"Joe",
*   "open":true,
*   "status_text":"In QA"
* }
*/

'use strict';

const expect = require('chai').expect;

module.exports = (app, db) => {
  console.log("The connected database object is ");
  console.log(db);
  app.route('/api/issues/:project')
    .get((req, res) => {
      
      const project = req.params.project;
      console.log("A get request was made to the api with project titled: " + project);
      const issuesCollection = db.collection('issues');
      
      
      // Query the database for the project in question. Return all documents that match the project
      let projectIssuesCursor = issuesCollection.find({project_title: project});
      let projectIssues = projectIssuesCursor.toArray();
      
      res.json(projectIssues);
    })
    
    .post(function (req, res){
      const project = req.params.project;
      console.log("something was posted");
      const issuesCollection = db.collection('issues');
      
      console.log("Something was posted!");
    
      // Add the given issue to the issues for that project
      let newIssueDoc = {
        "project_title": project,
        "issue_title": req.body.issue_title,
        "issue_text": req.body.issue_text,
        "created_on": new Date(),
        "updated_on": new Date(),
        "created_by": req.body.created_by,
        "assigned_to": req.body.assigned_to,
        "open":true,
        "status_text": req.body.status_text
      }
      issuesCollection.insertOne(newIssueDoc, (err, result) => {
        if(err) console.log('Database error: ' + err);
        console.log(result);
        
        // If the collection successfully inserted the document then return that 
        // document as the result.
        res.json(result.ops[0]);
      });
    })
    
    .put(function (req, res){
      const project = req.params.project;
      
    })
    
    .delete(function (req, res){
      const project = req.params.project;
      console.log("A delete request was made");
    });
    
};
