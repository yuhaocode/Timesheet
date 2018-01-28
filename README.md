Authright Tracking System
 
 Timesheet
1.     每个员工会有权限进入自己的timesheet进行输入修改等(只限自己的time sheet)（只能看时间相关）
2.     可按照人和客户公司分类，因为有可能一个人有多个合同，或者一个公司有多个员工在做，并可以按照总共的工作时间(或者总计金额)排序
3.     timesheet显示每个人每个项目的hourly rate
4.     timesheet 有功能选项：按周累计工作时间／金额， 按月累计工作时间／金额，按年累计工作时间／金额
5.     timesheet 有备注功能 比如员工为何当天没有工作
6.     显示每个contract的开始和截止日期，发invoice的周期（客户要求发的时间不同），客户的联系方式
7.     添加自动（生成预览格式）手动（可检查编辑）点击发送invoice（邮件）的功能
8.     可显示客户回款状态（提供标记）
9.     可储存每个contract的相关文件，供有权限的人随时查看
User Story:
- System Automatical Functionalities:
As a system, 
I want to create log including historical operation on this system, whenever a operation is done, 
so that the admin can see everything happened on this system.
As a system, 
I want to send mail reminders to crews who haven’t filled up their work hour and weekly summary on their calendar, at the end of this week,
so that the crew can be reminded of filling the timesheet.
As a system, 
I want to correctly compute staffs’ salary based on tax rate, hourly rate and work time (includes automatically update tax rate from official website),
so that manager can view each staffs’ subtotal salary.
- Level X Administrator
As an admin on this website, 
I want to add/inactive users, edit users’ ID, full name, username, title(1…*), access level, email, address, phone number, comment,
so that I can manage all the users properly.
As an admin on this website, 
I want to view system log, with the info of when and who did what, 
so that I can have the idea of all history operations on this system.
As an admin on this website, 
I want to undo/modify history operation,
so that I can correct unreasonable operation or unexpected mistakes in the system.
As an admin on this website, 
I want to change system variables, such as companies’ info, privileges in levels, titles or roles’ name and system settings(eg, when to send reminders)
so that I can tune the performance of this system.
- Level 5 Accountant Manager
1. As an accountant manager on this website,
I want to add/edit/hide contracts to consultants,
so that I can manage all the contract information.
2. As an accountant manager on this website,
I want to mark the contract with “paid”, “not paid(default)”, or  “partially paid”,
so that I can understand the payment status of each contract.
3. As an accountant manager on this website,
I want to fill/edit/view hourly rate for every contract of every crew,
so that the system can calculate the subtotal salary.
4. As an accountant manager on this website,
I want to define the search options, namely, the time range(week/months/years, includes default option “As of now”) and partitioning (group by company or crew),
so that the system can generate statistic summary based on this input.
	
5. As an accountant manager on this website,
I want to view the subtotal salary for every crew and the sorted order of the whole work hours and salaries,
so that I can see all the summaries in a concise manner.
6. As an accountant manager on this website,
I want to import/delete invoice template,	
so that the system can generate invoice based on the template.
	
7. As an accountant manager on this website,
I want to view the history of sent invoices of on specified contract,
so that I can see all the sent invoices in a list.
8. As an accountant manager on this website,
I want to generate a form of the invoice of one specified contract based on the info,
so that I can see this form concisely.
9. As an accountant manager on this website,
I want to edit the company name, balance due, due date in the generated form mentioned above, 
so that I can change the info in this form depending on the desired. 
	10. As an accountant manager on this website,
I want to generate a preview of the prepared invoice in PDF,
so that I can see this preview in a window.
	11. As an accountant manager on this website,
I want to send the prepared invoice to the client company,
so that the client company can receive the invoice in time.
	
- Level 4 Senior Manager
1. As a seninor manager on this website,
I want to add/edit/disable groups for different projects,
so that I can manage all projects systematically and conveniently.
- Level 3 Team Manager
1. As a team manager on this website,
I want to review/edit staffs’ work time,
so that I can check and monitor the inputs of work time of the team members(crews).
2. As a team manager on this website,
I want to approve staffs’ work time,
so that I can confirm the inputs of work time of the team members(crews).
3. As a team manager on this website,
I want to 
view the issues reported by Clientside-Managers,
so that I can keep track of the performance of the related contractors.
4. As a team manager on this website,
I want to collect statistical summaries(eg. weekly/monthly acc hours),
so that I can see the statistics concisely.
- Level 2 Clientside-Managers 
1. As a clientside-manager on this website,
I want to review/edit contractors’ work time,
so that I can check and monitor the inputs of work time of the related contractors.
2. As a clientside-manager on this website,
I want to approve contractors’ work time,
so that I can confirm the inputs of work time of the related contractors.
3. As a clientside-manager on this website,
I want to report issues (eg. report the reason of some absences) to the directly level 3 team manager,
so that I can record the reason of unusual events, and notice others.
4. As a clientside-manager on this website,
I want to collect statistical summaries of the relevant projects and the corresponding contractors(eg. weekly/monthly acc hours),
so that I can see the statistics concisely.
- Level 1 User(Crew) (eg. Full-time/Intern/Contractor)
1. As a crew on this website, 
I want to submit my daily work hours before the deadline of every week,
so that my work time can be recorded properly, and the manager can manage and operate it based on my inputs.
2. As a crew on this website, 
I want to review my work hour history,
so that I can verify the information of working hours I submitted.
3. As a crew on this website, 
I want to review my	accumulated working hours, with the filter of start date and end date, 
so that I have the idea of how many hours I have worked within some time range.
4. As a crew on this website, 
I want to add notes,
so that save some special information for that week.
5. As a crew on this website, 
I want to view contact person info/ admin info,
so that I can figure out any difficulties related to either working hours or system using experience with authorised person.
**************************************************
As a crew on this website, 
I want to check payment(weekly/monthly),
so that to get a rough idea of income
As a crew on this website, 
I want to edit personal contact info, namely, email, phone number, address
so that 
As a crew on this website, 
I want to view co-workers contact info,
so that 
leve1 有多少contract给多少sheet
- Level 3 Project-Managers 
team leader/manager 
- Level 4 Senior Managers 
- Level 5 Accountant
add/edit hourly rate
anything related to money
可以编辑添加invoice基于相关合同，
- Level 6 Admin 



