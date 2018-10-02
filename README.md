# Jobba

## Version Control

### Commit messages:

`git commit -m 'commit message'`<br>
`git commit -m 'commit message' -m 'detailed message'`<br>

adding something new: `Add [what was added in the commit]`<br>
removing something: `Remove [what removed added in the commit]`<br>
editing something existing: `Edit [what edited added in the commit]`<br>
fixing a bug: `Fix [the feature that was fixed]`<br>

Add also the issue number to end of commit messages.

**Example:** `git commit -m 'Add background image to frontpage #30'`

### Branch names:

creating a new branch: `git checkout -b branch-name`

creating a new feature: `feature-name-of-the-feature`<br>
fixing an existing feature: `fix-name-of-the-feature`<br>
removing a feature: `remove-name-of-the-feature`<br>
adding something smaller than a new feature: `add-what-will-be-added`<br>

**Example:** `git checkout -b feature-user-authentication`

### Deleting branches:

remote: `git push --delete origin <branch_name>`<br>
local: `git branch -d <branch_name>`

## Useful commands

install dependecies: `npm install`<br>
deploy local development server: `npm run dev-server`

### Production deployment:

install dependecies (if needed): `npm install`<br>
edit `\node_modules\google-maps-react\dist\index.js` mapStyles > container to <br>
```javascript
container: {
      position: 'absolute',
      minWidth: 200,
      minHeight: 200
    },
```
build: `npm run build:prod`<br>
deploy: `firebase deploy`
