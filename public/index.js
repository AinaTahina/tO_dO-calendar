const date = new Date() // Mon Feb 14 2022 18:22:16 GMT+0100

const renderCalendar = () => {

	const months = [
		"Janvier",
		"Fevrier",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Aout",
		"September",
		"Octobre",
		"November",
		"Decembre"
	]

	//affichage du mois
	document.querySelector(".date h1").textContent = months[date.getMonth()] 
	document.querySelector(".date p").textContent = new Date().toDateString();	// Date().toDateString() = 'jours mois année (en)'
	

	date.setDate(1)																// change la date en 1er jours du mois (utilisé pour l'affichage)

	// var prev-date
	var firstDayIndex = date.getDay()-1												// jour du 1er du mois : dim=0 , lun=1 ... sam=6
	var lastPrevDay = new Date(date.getFullYear(), date.getMonth() , 0).getDate()	// dernier jours du mois precedent
	var nbPrevDay = 0;																// nombre des derniers jours du mois precedent

	// var current-date
	var monthDays = document.querySelector('.days')
	var lastDay = new Date(date.getFullYear(), date.getMonth()+1 , 0).getDate()		// Date(année , mois , 0) = renvoie le dernier jrs du mois precedente
	var ndCurrentDay = 0;

	// affichage days
	function affichageJours(className , jrs){
		var d = document.createElement('div')
		var input = document.querySelector('.hidden')
		d.addEventListener('click' , () => input.value = `${jrs}_${date.getMonth()+1}_${date.getFullYear()}` ) // evenement.bind(this , jrs) OU function() { evenement(jrs) } sinon la fnct s'execute immediatement
		d.setAttribute('onClick' , 'javascript:this.parentNode.parentNode.submit()')
		d.classList.add(className)
		d.textContent = jrs
		monthDays.appendChild(d)

	}

	// prev-date
	if (date.getDay() == 0) {
		for (let i=6; i>0; i--)
			affichageJours("prev-date" , lastPrevDay - i +1)
		nbPrevDay = 6
	}
	else {
		for (let i=firstDayIndex; i>0; i-- ){
			affichageJours("prev-date" , lastPrevDay - i +1)
			nbPrevDay++
		}
	}

	// current-date
	for (let i = 1; i <= lastDay; i++){
		if(i == new Date().getDate() && date.getMonth() == new Date().getMonth())  // on utilise new date() car la valeur de dates() a deja ete changé
			affichageJours("today" , i)
		else
			affichageJours("current" , i)
		ndCurrentDay++
	}

	// next-date
	var nbNextDays = 42 - (ndCurrentDay + nbPrevDay)
	for (let j = 1; j <= nbNextDays ; j++){
		affichageJours('next-date' , j)
	}
}

// remove old content of '.days' and replace by new content in next/prev date
const RErenderCalendar = () => {
	let form = document.querySelector('.date_form')
	let days = document.querySelector(".days")
	let newDays = document.createElement('div')
	newDays.classList.add('days')
	form.removeChild(days)
	form.appendChild(newDays)
	renderCalendar()
}

// prev nex button
document.querySelector('.prev_date_btn').addEventListener('click' , () => {
	date.setMonth(date.getMonth() - 1)
	RErenderCalendar()
})

document.querySelector('.next_date_btn').addEventListener('click' , () => {
	date.setMonth(date.getMonth() + 1)
	RErenderCalendar()
})

renderCalendar()
