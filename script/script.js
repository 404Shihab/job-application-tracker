let interviewList = [];
let rejectedList = [];


// console.log('File Connected')
let total = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');

const allCardSection = document.getElementById('cards');

const allfilterBtn = document.getElementById('btn-all-filter');
const interviewfilterBtn = document.getElementById('btn-interview-filter');
const rejectedfilterBtn = document.getElementById('btn-rejected-filter');

const mainContainer = document.querySelector('main');
console.log(mainContainer);

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
    clickedBtn.classList.remove('btn-outline');
    clickedBtn.classList.add('btn-primary');
}