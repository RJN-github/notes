const notes = document.querySelector('.notes')
const createbtn = document.querySelector('.createbtn')

function createnote(text=''){
            let notecontainer = document.createElement("div")
            let notetext = document.createElement("p")
            let icons = document.createElement("icons")
            let pallete = document.createElement("img")
            let colorpicker = document.createElement("input")
            let increase = document.createElement("img")
            let decrease = document.createElement("img")
            let underline = document.createElement("img")
            let bold = document.createElement("img")
            let remove = document.createElement("img")

            notecontainer.className = "note-container"
            notetext.className = "note-text"
            notetext.setAttribute("contenteditable","true")
            icons.className = "icons"
            pallete.className = "pallete"
            colorpicker.setAttribute("type", "color")
            colorpicker.style.display = "none"
            increase.className = "increase"
            decrease.className = "decrease"
            bold.className = "bold"
            underline.className = "underline"
            remove.className = "delete"

            
            pallete.src = "assets/pallete.svg"
            increase.src = "assets/increase.svg"
            decrease.src = "assets/decrease.svg"
            bold.src = "assets/bold.svg"
            underline.src = "assets/underline.svg"
            remove.src = "assets/delete.svg"
            
            notetext.innerText = text;

            notecontainer.appendChild(notetext)
            notecontainer.appendChild(icons)
            icons.appendChild(pallete)
            icons.appendChild(increase)
            icons.appendChild(decrease)
            icons.appendChild(bold)
            icons.appendChild(underline)
            icons.appendChild(remove)
            icons.appendChild(colorpicker)
            notes.appendChild(notecontainer)


            remove.addEventListener('click',()=>{
                notecontainer.remove()
                savenotes()
            })

            notetext.addEventListener('input',()=>{
                savenotes();
            })

            pallete.addEventListener('click',()=>{
                colorpicker.click();
            })

            colorpicker.addEventListener('input',(e)=>{
                let selectedcolor = e.target.value
                notetext.style.color = selectedcolor
            })

            increase.addEventListener('click',()=>{
                let style = window.getComputedStyle(notetext , null).getPropertyValue("font-size")
                let currentfontsize  = parseFloat(style)
                notetext.style.fontSize = (currentfontsize + 1) +"px"
            })
            decrease.addEventListener('click',()=>{
                let style = window.getComputedStyle(notetext , null).getPropertyValue("font-size")
                let currentfontsize  = parseFloat(style)
                notetext.style.fontSize = (currentfontsize - 1) +"px"
            })
            bold.addEventListener('click',()=>{
                notetext.classList.toggle('bold')
                bold.classList.toggle("click")
            })
            underline.addEventListener('click',()=>{
                notetext.classList.toggle('underline')
                underline.classList.toggle("click")
            })
}

function savenotes() {
    const savednotes = Array.from(document.querySelectorAll('.note-text')).map(note=>note.innerText)
    localStorage.setItem("notes",JSON.stringify(savednotes))
    }

function loadnotes() {
    const loadsavednotes = JSON.parse(localStorage.getItem("notes")) || []
    loadsavednotes.forEach(notetext =>createnote(notetext));
}

window.addEventListener('load',loadnotes)

createbtn.addEventListener('click',()=>{
    createnote()
})