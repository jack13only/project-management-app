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

### How to work localy:

1. Clone the repo.
2. Use command ***npm i*** to install all necessary dependencies.
3. To start the project: ***npm run start***.
4. Switch to a new branch using ***git checkout -b branch name*** 
> Note! Before creating a new branch read section [Branches](#branches)

### Branches

1. Switch to the ***develop*** branch on your local version.
2. You have to pull all origin version changes, use command ***git pull origin develop***.
3. Resolve all required conflicts.
4. Create and switch to a new branch only from ***develop*** branch.
5. **Name all branches** in accorging to the name of the task, for example: The task's name is 'KB', create a branch with kb name, and at the end there will be an origin branch 'kb' for opening a PR into develop branch.

Branch ***main*** is empty exept for README.md!
There will be a finished version of the project in ***main*** branch at the end after all agreements and merges.

### Pull Request

1. After finishing, push all changes to the origin branch.
2. Open a PR from ***your branch name*** to the ***develop*** branch.
3. PR's name in according to the task's name, for example: backlog, header, backend.
3. PR's description: 
> 1. Task's name.
> 2. If there is an UI, add a screenshot.
> 3. Add a small description regarding your responsibilities for the task, for example: add a backlog section, add UI or just create project's readme.
> 4. Date regarding task's start and finish.

### Agreement and merging 

All merges into ***develop*** only after getting 3 likes of all participants on the PR.

### After origin version changes

After all origin merges you have to pull changes into your local version. Read steps 1-3 in [branches section](#branches), then switch to your task's branch and merge develop branch to the current choosen branch (***git merge develop***) and resolve conflicts if it's required.

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
