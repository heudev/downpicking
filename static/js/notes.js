var string1 = ["1/0", "1/1", "1/2", "1/3", "1/4", "1/5", "1/6", "1/7", "1/8", "1/9", "1/10", "1/11", "1/12"];
var string2 = ["2/0", "2/1", "2/2", "2/3", "2/4", "2/5", "2/6", "2/7", "2/8", "2/9", "2/10", "2/11", "2/12"];
var string3 = ["3/0", "3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7", "3/8", "3/9", "3/10", "3/11", "3/12"];
var string4 = ["4/0", "4/1", "4/2", "4/3", "4/4", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12"];
var string5 = ["5/0", "5/1", "5/2", "5/3", "5/4", "5/5", "5/6", "5/7", "5/8", "5/9", "5/10", "5/11", "5/12"];
var string6 = ["6/0", "6/1", "6/2", "6/3", "6/4", "6/5", "6/6", "6/7", "6/8", "6/9", "6/10", "6/11", "6/12"];
var string7 = ["7/0", "7/1", "7/2", "7/3", "7/4", "7/5", "7/6", "7/7", "7/8", "7/9", "7/10", "7/11", "7/12"];
var string8 = ["8/0", "8/1", "8/2", "8/3", "8/4", "8/5", "8/6", "8/7", "8/8", "8/9", "8/10", "8/11", "8/12"];
var allstring = string1.concat(string2, string3, string4, string5, string6, string7, string8);

var notes = ["E", "F", "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B", "C", "C#/D♭", "D", "D#/E♭", "E", "F", "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B", "C", "C#/D♭", "D", "D#/E♭", "E"];

function findoktave(note) {
    var indexnumber = notes.indexOf(note)
    var indexend = indexnumber + 13
    var oktave = []
    for (var i = indexnumber; i < indexend; i++) {
        oktave.push(notes[i])
    }
    return oktave
}

function noteplacement(string, scale) {
    var i = 0;
    string.forEach(fret => {
        document.getElementById(fret).innerHTML = scale[i];
        i++;
    })
}

function defaultnoteplacement() {
    noteplacement(string1, findoktave("E"))
    noteplacement(string2, findoktave("B"))
    noteplacement(string3, findoktave("G"))
    noteplacement(string4, findoktave("D"))
    noteplacement(string5, findoktave("A"))
    noteplacement(string6, findoktave("E"))
    noteplacement(string7, findoktave("B"))
    noteplacement(string8, findoktave("F#/G♭"))
    colorplacement()
}
defaultnoteplacement()

function colorplacement() {
    /* var colorlist = ["#eb3b5a", "#fa8231", "#26de81", "#2bcbba", "#4b7bec", "#a55eea", "#778ca3", "#4b6584", "#a5b1c2", "#d1d8e0", "#fed330", "#20bf6b"]; */
    var colorlist = [
        document.getElementById("colorinput1").value,
        document.getElementById("colorinput2").value,
        document.getElementById("colorinput3").value,
        document.getElementById("colorinput4").value,
        document.getElementById("colorinput5").value,
        document.getElementById("colorinput6").value,
        document.getElementById("colorinput7").value,
        document.getElementById("colorinput8").value,
        document.getElementById("colorinput9").value,
        document.getElementById("colorinput10").value,
        document.getElementById("colorinput11").value,
        document.getElementById("colorinput12").value
    ]
    var i = 0
    notes.slice(0, 12).forEach(note => {
        var idlist = [];
        allstring.forEach(allfret => {
            var getallnote = document.getElementById(allfret).innerHTML;
            if (note == getallnote) {
                idlist.push(allfret)
            }
        })
        idlist.forEach(id => {
            document.getElementById(id).style = `background: ${colorlist[i]}; /* transition: 1.5s */;`;
        })
        i++;
    })
}

function availabletune(stringnumber) {//Mevcut akortu verir.(E)
    switch (stringnumber) {
        case "string1":
            return document.getElementById("1/0").innerHTML
        case "string2":
            return document.getElementById("2/0").innerHTML
        case "string3":
            return document.getElementById("3/0").innerHTML
        case "string4":
            return document.getElementById("4/0").innerHTML
        case "string5":
            return document.getElementById("5/0").innerHTML
        case "string6":
            return document.getElementById("6/0").innerHTML
        case "string7":
            return document.getElementById("7/0").innerHTML
        case "string8":
            return document.getElementById("8/0").innerHTML
    }
}

function chancetune(stringnumber, direction) {
    function string() {//Belirtilen değere göre telin listesini döndürür["0/1","0/2"]
        switch (stringnumber) {
            case "string1":
                return string1
            case "string2":
                return string2
            case "string3":
                return string3
            case "string4":
                return string4
            case "string5":
                return string5
            case "string6":
                return string6
            case "string7":
                return string7
            case "string8":
                return string8
        }
    }
    function note() {
        var note = notes.indexOf(availabletune(stringnumber))
        return note
    }
    if (direction == "left") {
        noteplacement(string(), findoktave(notes[note() + 11]))
        if (getmode() == "all") {
            colorplacement()
        }
        else {
            if (clickednote != null) {
                changemodenotes(clickednote)
            }
        }
    }

    else if (direction == "right") {
        noteplacement(string(), findoktave(notes[note() + 13]))
        if (getmode() == "all") {
            colorplacement()
        }
        else {
            if (clickednote != null) {
                changemodenotes(clickednote)
            }
        }
    }
}

var tuningbutton = ["s1l", "s1r", "s2l", "s2r", "s3l", "s3r", "s4l", "s4r", "s5l", "s5r", "s6l", "s6r", "s7l", "s7r", "s8l", "s8r"]
for (const tuning of tuningbutton) {
    const btn = document.getElementById(tuning)
    function greet(event) {
        switch (btn.id) {
            case "s1l": chancetune("string1", "left")
                break
            case "s1r": chancetune("string1", "right")
                break
            case "s2l": chancetune("string2", "left")
                break
            case "s2r": chancetune("string2", "right")
                break
            case "s3l": chancetune("string3", "left")
                break
            case "s3r": chancetune("string3", "right")
                break
            case "s4l": chancetune("string4", "left")
                break
            case "s4r": chancetune("string4", "right")
                break
            case "s5l": chancetune("string5", "left")
                break
            case "s5r": chancetune("string5", "right")
                break
            case "s6l": chancetune("string6", "left")
                break
            case "s6r": chancetune("string6", "right")
                break
            case "s7l": chancetune("string7", "right")
                break
            case "s7r": chancetune("string7", "right")
                break
            case "s8l": chancetune("string8", "right")
                break
            case "s8r": chancetune("string8", "right")
                break
        }
    }
    btn.onclick = greet
}

//-------------------------------------------------------------------------------------

function mode(note, modename) {
    var oktave = findoktave(note)
    switch (modename) {
        case "ionian":
            return [oktave[0], oktave[2], oktave[4], oktave[5], oktave[7], oktave[9], oktave[11], oktave[12]]
        case "dorian":
            return [oktave[0], oktave[2], oktave[3], oktave[5], oktave[7], oktave[9], oktave[10], oktave[12]]
        case "phrygian":
            return [oktave[0], oktave[1], oktave[3], oktave[5], oktave[7], oktave[8], oktave[10], oktave[12]]
        case "lydian":
            return [oktave[0], oktave[2], oktave[4], oktave[6], oktave[7], oktave[9], oktave[11], oktave[12]]
        case "mixolydian":
            return [oktave[0], oktave[2], oktave[4], oktave[5], oktave[7], oktave[9], oktave[10], oktave[12]]
        case "aeolian":
            return [oktave[0], oktave[2], oktave[3], oktave[5], oktave[7], oktave[8], oktave[10], oktave[12]]
        case "locrian":
            return [oktave[0], oktave[1], oktave[3], oktave[5], oktave[6], oktave[8], oktave[10], oktave[12]]
    }
}


var modes = ["all", "ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"]
for (const mode of modes) {
    const btn = document.getElementById(mode)
    function greet(event) {
        clickednote = null
        if (btn.id == "all") {
            defaultnoteplacement()
            colorplacement()
        }
        else {
            allstring.forEach(x => {
                document.getElementById(x).style.background = "#6c757d"
            })
        }
    }
    btn.onclick = greet
}


function getmode() {//Mevcut modu verir.(ionian)
    var modes = document.getElementsByName("mode");
    var mode;
    for (var i = 0; i < modes.length; i++) {
        if (modes[i].checked) {
            mode = modes[i].value;
        }
    }
    return mode
}

function changemodenotes(note) {
    if (getmode() != "all") {
        allstring.forEach(x => {
            document.getElementById(x).style.background = "#6c757d"
        })
        var scale = mode(note, getmode());
        console.log(scale)
        allstring.forEach(id => {
            var getnote = document.getElementById(id).innerHTML
            if (scale.indexOf(getnote) != -1) {
                document.getElementById(id).style = `background: ${document.getElementById("colorinput13").value};`
            }
        })
    }
}
var clickednote = null
for (const id of allstring) {
    const btn = document.getElementById(id)

    function greet(event) {
        clickednote = btn.innerHTML
        changemodenotes(btn.innerHTML)

    }
    btn.onclick = greet
}


