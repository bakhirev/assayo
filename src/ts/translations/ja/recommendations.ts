export default `
§ recommendations.modal.cancel: Ok
§ recommendations.modal.open: More
§ recommendations.title
Recommendations and facts

§ recommendations.timestamp.firstCommit.description
made the first commit

Day of the Week: $1

§ recommendations.timestamp.lastCommit.description
made the last commit

Day of the Week: $1

§ recommendations.timestamp.common.title: $1 days
§ recommendations.timestamp.allDays.description: from the first to the last commit (including weekends and holidays).
§ recommendations.timestamp.lossesDays.description: days without commits, even considering weekends, vacation, and public holidays.
§ recommendations.timestamp.weekendDays.description
working on weekends

# Why this is bad:
- the client pays double the price for work on a weekend day;
- employees burn out faster;

§ recommendations.timestamp.regularWeekendWord.title: Regular Overtime
§ recommendations.timestamp.sometimeWeekendWord.title: Occasional overtime
§ recommendations.timestamp.weekendWord.description
It might be advisable to change the project manager, analyst, and architect.

# Why this is bad:
- the client pays double the price for work on a weekend day;
- the quality of the product is usually low;
- some employees resign;
- new errors emerge due to the rush;

# Most likely:
- deadlines were incorrectly estimated at the beginning;
- technical specifications are missing;
- weak analytics;
- weak architecture (no architect was hired, and the team consists of mid-level developers);
- started writing code first, then planning;
- lack of proper processes to understand mistakes;

§ recommendations.timestamp.neverWeekendWord.title: Usually Without Overtime
§ recommendations.timestamp.neverWeekendWord.description
But sometimes it happens.

# Why this is bad:
- the client pays double the price for work on a weekend day;
- employees burn out faster;

§ recommendations.scope.parallelism.not.title
No parallel work

§ recommendations.scope.parallelism.not.description
any feature at any given time is done by one person.

# Calculation method:
- person-days are divided by the actual days for each feature;
- we find the arithmetic mean;
- if the result is less than 1.3, we consider that there is usually no parallel work within most features;

# Why this is bad:
- increases bus factor;
- employees develop more slowly;
- difficult to properly check an employee's work;

# Why this is good:
- experts emerge who are deeply immersed in the subject area and can offer more quality solutions;
- most likely there are no merge conflicts;
- the project can quickly develop in different directions simultaneously;

§ recommendations.scope.parallelism.has.title
Some Work Done in Parallel

§ recommendations.scope.parallelism.has.description
Sometimes a feature is worked on simultaneously by several people.

# Calculation method:
- person-days are divided by the actual days for each feature;
- we find the arithmetic mean;
- if the result is from 1.3 to 2.0, we consider that some of the work within different features is sometimes done in parallel;

§ recommendations.scope.parallelism.every.title
Parallel Work

§ recommendations.scope.parallelism.every.description
any feature at any given time is worked on by several people

# Calculation method:
- person-days are divided by the actual days for each feature;
- we find the arithmetic mean;
- if the result is more than two, we consider that most of the work within different features is usually done in parallel;

§ recommendations.scope.money
this is the estimated cost for the work on this project.

# Calculation method:
- person-days spent on development are multiplied by the individual salaries of the developers;

To change the salary of each developer for a more accurate total, go to the "Settings" section.

# Is this too much or too little?
To answer this question, consider the following:
- Could a ready-made solution have been purchased for this amount of money?
- Could a better product have been developed for this amount of money?

If the answer to both questions is "yes," then perhaps developing from scratch was not worth the money spent.
 
§ recommendations.scope.bus.everyHasOne.title
Bus factor = 1

§ recommendations.scope.bus.everyHasOne.description
Most features are deeply understood by only one person.
It's necessary to rotate people.

# Why this is bad:
- if employees resign, it will be difficult to continue their work;
- it’s impossible to control the quality of their code;

# How the sample is chosen:
- more than 80% of commits in a feature are made by one person;
- the project has more than 60% of such features;

§ recommendations.scope.bus.oneMaintainer
one person is deeply involved in a feature.

# Why this is bad:
- if they resign, it will be hard to continue development;
- the quality of code-review decreases;
- it’s difficult to parallelize development when needed;

# How the sample is chosen:
- more than 80% of commits in a feature are made by one person;

§ recommendations.scope.types.process.title
Poor processes

§ recommendations.scope.types.process.description
Most features contain one type of task.

§ recommendations.scope.types.one
features contain one type of task.

§ recommendations.scope.types.common
It's possible that developers are incorrectly signing commits or the manager is entering the same type of tasks.

# Why this is important:
- it's impossible to hand over support to another team;
- it's impossible to release a "boxed" version;
- strong dependence on specific developers;
- a high number of errors and low code quality;
- potential slowdown in development in the future;

# The manager's mistake:
- viewing the product only from the perspective of a "working demo";

# What should be done:
- tests;
- bugs (identified through testing);
- refactoring (as architecture may change);
- documentation;
- style revisions (as a result of focus group feedback);

§ recommendations.scope.plan.title
Develop a long-term plan

§ recommendations.scope.plan.description
taking architecture into account.

This plan should immediately focus on the most challenging tasks.

# Why the lack of a plan is bad:
- employees create a minimally viable version without planning for expansion points. After this, unscalable code is written, which slows down future features;

# The manager's mistake:
- they haven't shown how the product will develop further and where the growth points will be;

# How it should be done:
- a global product development plan is created;
- a global architecture development plan is created (with developers and DBAs);
- potential significant changes are discussed upfront at the schematic level;

§ recommendations.scope.cost.title
Evaluate Investment in a Feature

§ recommendations.scope.cost.description
in terms of potential profit.

Features that are expensive to develop but bring little profit may need to be postponed or even canceled. This will make the project more commercially successful.

§ recommendations.author.lotOfLazy.title: Too little code: $1
§ recommendations.author.lotOfLazy.description
Should they be fired?

# Composition: 
- $1;

# Answer the questions:
- are they a team leader, architect, or analyst?
- is this their primary project?
- are there any dependencies on them?

# Why it makes no sense to correct
The total costs for the developer are already more than the profit from their work.
If we believe that there were no objective hindrances to their work, then the person either does not want to work at all or is working on two projects simultaneously.
Firing and replacing them with a new employee seems justified from a statistical point of view.

§ recommendations.author.manyLazy.title: Little code: $1
§ recommendations.author.manyLazy.description
Needs to be monitored.

# Composition: 
- $1;

# How the sample is chosen:
- in test samples, a good programmer writes code for more than 80% of the time;
- in this case, the indicator is between 60% and 80%;

# How to monitor:
- break tasks into 1..2 days;
- ask for a status update every day;
- ensure tasks are well defined and ready for development;
- arrange pair programming to check actual speed;

§ recommendations.author.oneTypeMans
receives too many monotonous tasks of the same type. Risk of burnout.

# Why this is important:
- if an employee burns out, their work speed will decrease;
- professional growth slows down;
- the likelihood of resignation increases;

# How the sample is chosen:
- the type of task is determined for each commit;
- if more than 70% of tasks are of the same type, it means the person is doing the same thing repeatedly;

§ recommendations.author.workToday.title: Working $1
§ recommendations.author.workToday.description
on the project at this moment.

# Composition: 
- $1;

# Why specifically them:
- more than 50% of workdays;
- have worked during the last 30 days;

§ recommendations.author.dismissed.title: Dismissed $1
§ recommendations.author.dismissed.description
or worked for a short period.

# Composition:
- $1;

# Why specifically them:
- worked at a normal pace (apparently, this is their main repository);
- no commits in the last month;
- vacation usually lasts 14 days (their absence does not resemble a vacation);

§ recommendations.author.staff.title: Assisting $1
§ recommendations.author.staff.description
People of other specializations who have committed something.

# Composition: 
- $1;

# Why specifically them:
- this is not an open-source project;
- workdays less than 15% of the total number;
- modify roughly the same files;

§ recommendations.author.projectType.openSource.title
Open Project

§ recommendations.author.projectType.openSource.description
they do not work five days a week here.

The project may be closed, but this work pace is typical for open libraries on GitHub.

# Assessment method:
- statistics are taken for all active developers;
- the average number of working days and days without commits is calculated;
- for open-source libraries, working days are usually a maximum of 15..20%;

# Consequences
For projects where work is not constant, many indicators do not make sense. Therefore, indicators like days without commits, speed, etc., will be hidden.

Typically, such projects are assessed before starting the development of their own closed version. The most interesting indicators in this case are the probable cost and total development time.

§ recommendations.author.projectType.easy.title
Light Workload

§ recommendations.author.projectType.easy.description
too many days without commits.

It is necessary to understand why the team is not writing code.

# Assessment method:
- take statistics from all active developers;
- calculate the average number of working days and days without commits;
- workload is considered light if the percentage of days without commits is between 5% and 20%;

# Possible reasons:
- there are actually no tasks;
- there are tasks, but they fit well with the current architecture;
- developers are distracted by meetings;
- the team is not working;

# Solutions:
- discuss the issue with the team;
- reduce task granularity so that one or two tasks can be completed in a day;
- introduce daily meetings to check the status of tasks;
- arrange pair programming sessions to ensure that the developer can work faster;

§ recommendations.author.manager.title
Set Deadlines

§ recommendations.author.manager.description
Every task should have a clear deadline.
 
This will prevent dragging out its completion for several days or weeks.

# Indicators to check:
- the number of days spent on one task by an employee;
- the number of days waiting for PR merge (PR statistics page);

§ recommendations.author.shorTalk.title
Conduct Daily Meetings

§ recommendations.author.shorTalk.description
they help stay informed about the project.
 
Do not stretch them by getting sidetracked on irrelevant topics.

# Questions the employee should answer:
- what was done;
- what will be done;
- are there any issues;

# Interruptions should occur if:
- they start describing minor details in-depth, which are not important;
- they steer the conversation away from the original plan;

# Why this is important:
Often an employee who does nothing tries to avoid the answer by telling a bunch of unnecessary details of their work. This lulls the participants' attention and stretches the time for a response. It creates an impression that they are busy, even though there was no actual work done.

§ recommendations.author.ipr.title
Develop a Training Plan

§ recommendations.author.ipr.description
for each employee.

*Individual training plan* is a list of goals and tasks that help a person develop in a certain area.

# How to create a plan:
- create a competency matrix;
- identify which competencies have the least knowledge and experience;
- find out which of these competencies are of interest to the employee;
- come up with 3..5 goals within each such competency for the next six months or a year;
- try to do something every month to achieve one goal;
- remind every month about the overall plan to achieve these goals;

# Does a manager need a plan?
Yes, the manager should also make a plan for themselves. If there is no higher-level manager, they should self-assess.

# Why this is important:
- employees become more loyal to the company;
- you get more qualified personnel for the same money;

§ recommendations.author.oneToOne.title
Conduct One-on-One Meetings Every Month

§ recommendations.author.oneToOne.description
it helps to identify problems at an early stage.

*One-to-one* is a regular personal meeting of a manager with a subordinate. Such meetings typically discuss everything important to the employee, what concerns them, and what they can share with the manager in private.

# Why this is important:
- easy to find out who is overburdened and who has free time;
- possible to prevent employee burnout;
- quick feedback can be obtained about processes that you might not notice;
- trust is built, making employees more loyal to the company;
- increases employee motivation and engagement;

§ recommendations.author.club.title
Go to a Bar

§ recommendations.author.club.description
once a month or two.

This will help build informal communication within the team and bring the team together, even if the interaction is brief.

# Why this is important:
- quick feedback can be obtained about processes that you might not notice;
- trust is built, making employees more loyal to the company;
- increases employee engagement;

§ recommendations.hour.onlyWork.title: No Weekends Here
§ recommendations.hour.onlyWork.description: The project manager should probably be fired.
§ recommendations.hour.weekends.title: Working on Weekends
§ recommendations.hour.weekends.description: The project manager should probably be checked.
§ recommendations.hour.easy.title: There Are Problems
§ recommendations.hour.easy.description: There are likely crunch times and work is needed on weekends.
§ recommendations.week.lazyDays.down.title: Fewer Absences
§ recommendations.week.lazyDays.down.description: this indicator has dropped over the last three weeks
§ recommendations.week.lazyDays.up.title: More Absences
§ recommendations.week.lazyDays.up.description: no tasks or stricter control is needed
§ recommendations.week.notWork.title: Consistently Underperforms
§ recommendations.week.notWork.description: as every week the code is not 100% of the time
§ recommendations.week.upWork.title: Consistently Overworks
§ recommendations.week.upWork.description: as every week code is written on weekend days
§ recommendations.week.task.up.title: Productivity is growing
§ recommendations.week.task.up.description: or tasks have become too small. Need to check. If granularity is the same - reinforce the result.
§ recommendations.week.task.lazyMaintainer.description: consistently leads in absences. Fire?
§ recommendations.week.task.down.title: Productivity is Falling
§ recommendations.week.task.down.description
or tasks are poorly split. Need to check. If granularity is the same - take control.

# Assessment method:
- the number of tasks per day that are being worked on has been steadily decreasing over the last three weeks.

# Possible errors:
- tasks could have been more complex than they seemed;
- tasks could have had a large volume of work (need to check if the number of changes is also decreasing during this period)

§ recommendations.type.everyHasOne.title: Not signing task types
§ recommendations.type.everyHasOne.description: Most task types are done by one person.
§ recommendations.type.oneMaintainer.title: Narrow Specialization
§ recommendations.type.oneMaintainer.description
most tasks of one type are done by the same people.

# Task types:

§ recommendations.type.common
# It might not be the case

Make sure that other employees correctly sign commits.

Steps to ensure this:
- set up a pre-commit check for commit messages;
- explain to the team the need to indicate the type;
- check in new branches that employees follow this rule;

# If it is indeed the case

You have set up checks and ensured that the same employee does tasks of the same type.

Why this is bad:
- their resignation will halt a whole bunch of processes;
- it reduces the competence of other team members;
- difficult to understand their edits at a higher level;

How to fix this:
- distribute different types of tasks evenly;
- change the area of work (tests, documentation, bugs) among employees every sprint;

§ recommendations.type.fewTypes.title
This is a local product

§ recommendations.type.fewTypes.description
for a specific customer or problem.

# Signs of a "global" product:
- localization;
- documentation;
- a large volume of tests;
- visual customization;
- refactoring of bottlenecks;
- etc.

# Why this product looks like a "local" one:
- each "global" sign will be outweighed by its type of task;
- the more "global" signs, the more likely a "global" product;

In this case, we see a small number of types, which likely indicates shortcomings that prevent the product from being easily scaled to the global market and sold in other countries.

# It might not be the case
Based on file types, we can assume the type of program (website, server application, DevOps scripts, etc.). For a frontend application, our hypothesis will be more accurate than for DevOps scripts, which might just be a micro-module of initialization.

§ recommendations.type.diff.title
Split the popular type into subtypes

§ recommendations.type.diff.description
to detail errors.

Typically, the task type labeled "bug fixing" is leading. This makes the statistics weakly detailed.

*If you encounter this situation*, you can break down this type into subtypes (e.g., based on the location of detection).

Consider several options for subtypes:
- fix_dev (error detected during development);
- fix_test (error detected during testing);
- fix (error detected in production);

§ recommendations.type.buddy.title
Accumulate minor tasks

§ recommendations.type.buddy.description
for new employees.

# If a task is:
- not important;
- not big;
- doesn't require deep immersion in the context;
- more about refactoring than new code;

# Put it in the backlog with the label "for beginners".

When a new employee arrives, you will be able to immediately pull out a bunch of small and varied tasks for them to get acquainted with the project.

Also, if you have a lull in work, you can pull out one such minor task from the backlog.
`;
