let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');

const allCardSection = document.getElementById('cards');
const allfilterBtn = document.getElementById('btn-all-filter');
const interviewfilterBtn = document.getElementById('btn-interview-filter');
const rejectedfilterBtn = document.getElementById('btn-rejected-filter');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');

function calculateCount() 
{
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}

calculateCount();

function toggleStyle(id) 
{
    allfilterBtn.classList.remove('btn-primary');
    interviewfilterBtn.classList.remove('btn-primary');
    rejectedfilterBtn.classList.remove('btn-primary');

    allfilterBtn.classList.add('btn-outline');
    interviewfilterBtn.classList.add('btn-outline');
    rejectedfilterBtn.classList.add('btn-outline');

    const clickedBtn = document.getElementById(id);
    currentStatus = id;
    clickedBtn.classList.remove('btn-outline');
    clickedBtn.classList.add('btn-primary');

    if (id == 'btn-interview-filter') 
    {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id == 'btn-all-filter') 
    {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id == 'btn-rejected-filter') 
    {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejectview();
    }
}

mainContainer.addEventListener('click', function (event) 
{

    if (event.target.closest('.delete-btn')) 
      {
        const card = event.target.closest('.p-6');
        const companyName = card.querySelector('.compnay-name')?.innerText;

        if (currentStatus === 'all' || currentStatus === 'btn-all-filter') 
        {

            card.remove();
        } 
        else
        {
 
            card.remove();

            const allCards = allCardSection.querySelectorAll('.p-6');
            allCards.forEach(c => {
                if (c.querySelector('.compnay-name')?.innerText === companyName) 
                {
                    c.remove();
                }
            });
        }


        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
        calculateCount();
        return;
    }

    if (event.target.classList.contains('inter-btn')) 
    {
        const parentNode = event.target.parentNode.parentNode.parentNode.parentNode;

        const companyName = parentNode.querySelector('.compnay-name').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobDetails = parentNode.querySelector('.job-details p').innerText;
        const jobSummary = parentNode.querySelector('.job-summary').innerText;

        parentNode.querySelector('.job-status').innerText = 'Interview';

        const jobInfo = { companyName, jobTitle, jobDetails, jobStatus: 'Interview', jobSummary };

        const jobExist = interviewList.find(item => item.companyName == jobInfo.companyName);
        if (!jobExist) interviewList.push(jobInfo);

        rejectedList = rejectedList.filter(item => item.companyName != jobInfo.companyName);

        updateMainCardStatus(companyName, 'Interview');

        calculateCount();
        if (currentStatus == 'btn-interview-filter') renderInterview();
        if (currentStatus == 'btn-rejected-filter') renderRejectview();

    }
    else if (event.target.classList.contains('reject-btn')) 
    {
        const parentNode = event.target.parentNode.parentNode.parentNode.parentNode;

        const companyName = parentNode.querySelector('.compnay-name').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobDetails = parentNode.querySelector('.job-details p').innerText;
        const jobSummary = parentNode.querySelector('.job-summary').innerText;

        parentNode.querySelector('.job-status').innerText = 'Rejected';

        const jobInfo = { companyName, jobTitle, jobDetails, jobStatus: 'Rejected', jobSummary };

        const jobExist = rejectedList.find(item => item.companyName == jobInfo.companyName);
        if (!jobExist) rejectedList.push(jobInfo);

        interviewList = interviewList.filter(item => item.companyName != jobInfo.companyName);

        updateMainCardStatus(companyName, 'Rejected');

        calculateCount();
        if (currentStatus == 'btn-rejected-filter') renderRejectview();
        if (currentStatus == 'btn-interview-filter') renderInterview();
    }
});


function updateMainCardStatus(companyName, status) 
{
    const allCards = allCardSection.querySelectorAll('.p-6');
    allCards.forEach(card => {
        if (card.querySelector('.compnay-name')?.innerText === companyName) 
        {
            card.querySelector('.job-status').innerText = status;
        }
    });
}

function cardTemplate(job) 
{
    return `
        <div class="left-side">
            <div class="job-info py-4">
                <h3 class="compnay-name text-xl font-bold my-1">${job.companyName}</h3>
                <p class="job-title text-neutral/50">${job.jobTitle}</p>
            </div>
            <div class="job-details">
                <p class="py-3 text-neutral/50">${job.jobDetails}</p>
                <button class="job-status btn btn-soft my-3">${job.jobStatus}</button>
            </div>
            <div class="job-summary">
                <p>${job.jobSummary}</p>
            </div>
            <div class="inter-reject-btns flex gap-2 py-3">
                <div class="inter-btn">
                    <button class="inter-btn btn btn-outline btn-success">INTERVIEW</button>
                </div>
                <div class="reject-btn">
                    <button class="reject-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>
        </div>
        <div class="rigt-side">
            <button class="delete-btn btn btn-circle">
                <i class="fa-regular fa-trash-can text-gray-400"></i>
            </button>
        </div>
    `;
}

function renderInterview() 
{
    filterSection.innerHTML = '';
    for (let inter of interviewList) {
        let div = document.createElement('div');
        div.className = 'p-6 flex justify-between bg-white rounded-md';
        div.innerHTML = cardTemplate(inter);
        filterSection.appendChild(div);
    }
}

function renderRejectview() 
{
    filterSection.innerHTML = '';
    for (let reject of rejectedList) 
    {
        let div = document.createElement('div');
        div.className = 'p-6 flex justify-between bg-white rounded-md';
        div.innerHTML = cardTemplate(reject);
        filterSection.appendChild(div);
    }
}