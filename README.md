# Project Overview

## Clobber

[Netlify Deploy](https://clobber.netlify.app/)

## Project Description

Clobber is a react app which emulates the popular boardgame Clobber. It maintains a front-end boardgame for users to interact with while displaying high scores from an API. The board is displayed using grid layout for a responsive lay-out. Users can choose from multiple levels of difficulty.

## Acknowledgement

This project was partially inspired by a previous [group project](https://github.com/MakerMacAttack/theClobbit) the author worked on in a graduate course in AI. Fellow students in the project were Andrew O'Brien and Colleen Cannon.

## Wireframes

Instructions - Mobile

![Instructions - Mobile](https://user-images.githubusercontent.com/45667956/95589304-8e6b0700-0a12-11eb-8661-5a6eb27a46e9.png)

Difficulty - Mobile

![Difficulty - Mobile](https://user-images.githubusercontent.com/45667956/95589461-c40ff000-0a12-11eb-80ec-fa8e1567ff4d.png)

Leaderboard - Mobile

![Leaderboard - Mobile](https://user-images.githubusercontent.com/45667956/95589623-fc173300-0a12-11eb-810b-0e84afe44c49.png)

Victory - Mobile

![Victory - Mobile](https://user-images.githubusercontent.com/45667956/95589724-22d56980-0a13-11eb-863c-84a9e4729f1a.png)

Board - Mobile

![Board - Mobile](https://user-images.githubusercontent.com/45667956/95589935-6b8d2280-0a13-11eb-9b97-5806c4a80752.png)

Board - Tablet

![Board - Tablet](https://user-images.githubusercontent.com/45667956/95589992-82337980-0a13-11eb-8e25-7039963d1f05.png)

Board - Desktop

![Board - Desktop](https://user-images.githubusercontent.com/45667956/95590193-be66da00-0a13-11eb-84e0-fcddd3afb165.png)

## Component Hierarchy

![ComponentHierarchy](https://i.imgur.com/e6kJLAF.png)

## API and Data Sample

I will be using a personal Airtable which will log the username, time of creation, and number of moves it took to win of each winner. The High Scores component will then display the top 20 winners for all the world to see.

```{
    "records": [
        {
            "id": "rec36yesPxv9VQ1RB",
            "fields": {
                "Name": "Mac",
                "Turns": 17,
                "Seniority": "2020-10-09T00:15:23.000Z"
            },
            "createdTime": "2020-10-09T00:15:23.000Z"
        }
    ],
    "offset": "rec36yesPxv9VQ1RB"
}
```

### MVP/PostMVP

#### MVP 

- A board upon which a player can play. 
- Instructions for play which show up at the start of the game and then go away.
- A display of the 20 high scores.

#### PostMVP  

- Medium AI.
- Hotseat 2-player mode.
- Nicer graphics

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|October 8| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|October 9| Project Approval | Complete
|October 12| Specification | Complete
|October 12| Core Application Structure (HTML, CSS, etc.) | Complete
|October 13| Pseudocode / actual code | Complete
|October 14| Initial Clickable Model  | Complete
|October 15| MVP | Complete
|October 16| Presentations | Incomplete

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Specification | H |  3hr | 3hr | 3hr |
| Psuedocode | H |  3hr | 2hr | 2hr |
| Navbar | H |  2hr | 3hr | 3hr |
| Instructions | H |  1hr | 2hr | 2hr |
| Difficulty | M |  2hr | 1hr | 1hr |
| Victory | H |  1hr | 1hr | 1hr |
| Render High Scores | H |  2hr | 3hr | 3hr |
| Set up Airtable | H |  2hr | 3hr | 3hr |
| Connect Airtable and High Scores | H |  2hr | 1hr | 1hr |
| Render Board | H |  2hr | 3hr | 3hr |
| Square functionality | H |  3hr | 3hr | 3hr |
| Poll all valid moves | H |  2hr | 2hr | 2hr |
| Basic CSS Square | H |  2hr | 3hr | 3hr |
| Basic CSS Everything else | H |  3hr | 6hr | 6hr |
| Advanced CSS Square | M |  3hr | 3hr | 3hr |
| Advanced CSS Board | M |  3hr | 3hr | 3hr |
| Advanced CSS Everything Else | L |  3hr | 3hr | 3hr |
| Make a move | H |  3hr | 4hr | 4hr |
| Update ReadME | H | 3hr | 2hr | 2hr |
| Total | H | 41hrs| 47hr | 47hr |

## SWOT Analysis

### Strengths:

Experience with coding this particular game

### Weaknesses:

There is a lot of this program I have never done before.

### Opportunities:

I can expand my repetoire and if this functions it could be a fun, simple addition to my portfolio.

### Threats:

I have no guarantee that I can do this, and game logic can sometimes be very difficult.
