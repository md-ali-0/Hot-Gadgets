const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    displayPhone(phones, isShowAll);
}
const displayPhone = (phones, isShowAll) => {

    if (phones.length >= 12 && !isShowAll) {
        document.getElementById('show-all').classList.remove('hidden')
    }else{
        document.getElementById('show-all').classList.add('hidden')
    }
    if (!isShowAll) {
        phones = phones.slice(0,12)
    }
    
    const phonesContainer = document.getElementById('phones');

    phonesContainer.textContent = '';
    phones.forEach(phone => {

        const phoneItem = document.createElement('div');
        phoneItem.classList.add('text-center', 'bg-white', 'rounded-lg', 'p-3', 'm-3')
        phoneItem.innerHTML = `
        <div class="bg-[#0D6EFD0D] rounded-lg">
            <img class="mx-auto p-3" src="${phone.image}" alt="">
        </div>
        
        <h3 class="text-gray-900 font-bold text-2xl mt-3">${phone.phone_name}</h3>
        <p class="text-dark_3 text-xl mt-3">There are many variations of passages of available, but the majority have suffered</p>
        <button onclick="showDetails('${phone.slug}')" class="bg-primary text-white rounded-md py-2 px-3 mt-3">Show Details</button>
        `
        phonesContainer.appendChild(phoneItem);
    });
    toggolLoadingSpinner(false);
}
const searchHandler = (isShowAll) => {
   const searchInputValue =  document.getElementById('search_input').value;
   toggolLoadingSpinner(true);
   loadPhone(searchInputValue, isShowAll);
}
const toggolLoadingSpinner = (isLoading) => {
    const spinner = document.querySelector('#loading-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden')
    } else {
        spinner.classList.add('hidden')
    }
}
const showAllHandler = () => {
    searchHandler(true)
}
const showModal = async (id) => {
   const phoneData = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await phoneData.json()
   const phoneItem = data.data;
   const modal = document.getElementById('modal');
   const phoneModal = document.createElement('div')
   phoneModal.classList = `relative w-full max-w-md max-h-full`
   phoneModal.innerHTML = `
   <div class="relative bg-white rounded-lg shadow ">
    <!-- Modal body -->
    <div class="p-6 space-y-6">
        <div class="bg-[#0D6EFD0D] rounded-lg">
            <img class="mx-auto p-3" src="${phoneItem.image}" alt="">
        </div>
        <h3 class="text-gray-900 font-bold text-2xl mt-3">${phoneItem.name}</h3>
        <p class="text-dark_3 text-xl mt-3">There are many variations of passages of available, but the majority have suffered</p>
        <p class="text-xl"><span class="font-semibold">ChipSet:</span> ${phoneItem.mainFeatures?.chipSet}</p>
        <p class="text-xl"><span class="font-semibold">Display Size:</span> ${phoneItem.mainFeatures?.displaySize}</p>
        <p class="text-xl"><span class="font-semibold">Brand:</span> ${phoneItem.brand}</p>
    </div>
    <!-- Modal footer -->
    <div class="flex justify-end items-center p-3 border-t border-gray-200 rounded-b ">
        <button onclick="closeModal()" class="bg-primary text-white rounded-md py-2 px-3 mt-5">Close</button>
    </div>
    </div>
   `
   modal.appendChild(phoneModal);
   modal.classList.remove('hidden');
   modal.classList.add('flex', 'justify-center', 'items-center');

}
const closeModal = () =>{
    const modal = document.getElementById('modal');
    modal.textContent = ''
    modal.classList.add('hidden');
}
const showDetails = (id) => {
    showModal(id)
}