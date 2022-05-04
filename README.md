# project-management-app - KB

## REPO: how to work

1. [How to work localy](#how-to-work-localy)
2. [Branches](#branches)
3. [PR](#pull-request)
4. [Agreement and merging](#agreement-and-merging)
5. [After origin changes](#after-origin-version-changes)
6. [Commits](#commits)

## Command work

1. [SCRUM](#scrum)
2. [Meetings](#meetings)
3. [Technologies, additional methodologies](#technologies-and-methodologies)

---

## REPO: how to work

### How to start working locally:

1. Clone the repo.
2. Use command ***npm i*** to install all necessary dependencies.
3. To start the project: ***npm run start***.
4. Switch to a new branch using ***git checkout -b branch name*** 

### Branches
> Note! Before creating a new branch read the section below.

**Name all branches** in accorging to the name of the task, for example: The task's name is 'KB', create a branch with kb name, and at the end there will be an origin branch 'kb' for opening a PR into develop branch.

Create a branch and start to work: 

1. Switch to the ***develop*** branch on your local version, use command ***git checkout develop***
2. You have to pull all origin version changes, use command ***git pull origin develop***.
3. Then create a new branch, use command ***git checkout -b task-name***
4. Work with task.

> Before pushing results of your work you need to merge the last version of develop branch: 

1. Commit changes ***git commit -m "commit message"***
2. Switch to the branch 'develop', use command ***git checkout develop***.
3. ***git pull***.
4. ***git checkout task-name***.
5. ***git pull origin develop***.
3. Resolve all required merge conflicts.
4. Push all your changes ***git push origin task-name***.

There will be a merged version/part of the project after each weekly sprint inside ***main*** branch after all agreements. At the end the main branch will include results of each sprint.

### Pull Request

1. After finishing, push all changes to the origin branch.
2. Open a PR from ***your branch name*** to the ***develop*** branch.
3. PR's name in according to the task's name, for example: backlog, header, backend.
3. PR's description: 
> 1. Task's name.

*optionally:*
> 2. If there is an UI, add a screenshot.
> 3. Add a small description regarding your responsibilities for the task, for example: add a backlog section, add UI or just create project's readme.
> 4. Date regarding task's start and finish.

### Agreement and merging 

All merges into ***develop*** only after getting 3 likes of all participants on the PR.

### After origin version changes

After all origin merges you have to pull changes into your local version. Read steps 1-6 in section [Before pushing results of your work you need to merge the last version of develop branch](#branches).

### Commits

Name all commits regarding current changes, read [commits convention](https://docs.rs.school/#/git-convention)

## Command work

**Customer's task**: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/final-task-project-management-app.md

### SCRUM

We use such methodology as [SCRUM](https://www.atlassian.com/ru/agile/scrum) for project managment.

### Meetings

> Daily meetings regarding finished work + next tasks and plans, ~ 5-10 min., at 7 p.m.

> Weekly meetings regarding current weekly sprints.

### Technologies and methodologies

1. For usable html-structure it's better to use [BEM-methodology](https://ru.bem.info/methodology/quick-start/).
2. Development: React + Redux Toolkit, SASS/SCSS, TypeScript.
