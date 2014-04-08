#!/usr/bin/env node

var GitHubApi = require('github'),
    _ = require('lodash');

var teams = {
  'Owners': [
    'jefftougas',
    'kutrumbo',
    'earthsmurf',
    'neil-lobracco',
    'brianyingling'
  ],
  'CI': [
    'dac-jenkins',
  ]
};

if (!process.env.GH_CSV_SYNC_TOKEN) {
  console.error('Environment variable GH_CSV_SYNC_TOKEN must be set to github oauth token before proceeding!');
} else {

  var github = new GitHubApi({
      version: '3.0.0',
      
      // optional
      //debug: true,
      timeout: 5000
  });

  github.authenticate({
      type: "oauth",
      token: process.env.GH_CSV_SYNC_TOKEN
  });

  github.orgs.getTeams({
      org: "daftcorp"
  }, function(err, res) {

    _.each(teams, function(users, teamName) {
      console.log('syncing team: ' + teamName);

      var i = _.findIndex(res, {"name": teamName});
      var id = res[i]["id"];

      github.orgs.getTeamMembers({
        id: id,
        per_page: 100,
      }, function(err, res) {
        var currentMembers = _.map(res, function(member) {
          return member.login;
        });

        var usersToAdd = _.difference(users, currentMembers),
            usersToDel = _.difference(currentMembers, users);
        console.log('Need to add: ' + usersToAdd);
        console.log('Need to delete: ' + usersToDel);

        _.each(usersToAdd, function(u) {
          github.orgs.addTeamMember({
            user: u,
            id: id
          }, function(err, res) {
            console.log('finished adding ' + u);
            if (err) {
              console.log(err);
            }
          });
        });

        _.each(usersToDel, function(u) {
          github.orgs.deleteTeamMember({
            user: u,
            id: id
          }, function(err, res) {
            console.log('finished deleting ' + u);
            if (err) {
              console.log(err);
            }
          });
        });


      });
    });
  });
}
