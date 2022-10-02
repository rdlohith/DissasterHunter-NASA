function openTabLeft(evt, tabName) {
    var i, tabcontentLeft, tablinksLeft;

    if (!document.isInit) {
        document.isInit = 1;
        tabcontentLeft = document.getElementsByClassName("tabcontentLeft");
        for (i = 0; i < tabcontentLeft.length; i++) {
            tabcontentLeft[i].style.display = "none";
        }
    }

    tablinksLeft = document.getElementsByClassName("tablinksLeft");
    for (i = 0; i < tablinksLeft.length; i++) {
        if (tablinksLeft[i].hasAttribute("target", "active")) {

            tablinksLeft[i].removeAttribute("target", "active");
        }
    }

    if (document.getElementById(tabName).style.display == "none") {
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.setAttribute("target", "active");

    }
    else {
        document.getElementById(tabName).style.display = "none";
        document.getElementById(tabName).className.replace("active", "");
        evt.currentTarget.removeAttribute("target", "active");
    }

    tabcontentLeft = document.getElementsByClassName("tabcontentLeft");
    for (i = 0; i < tabcontentLeft.length; i++) {
        if (tabcontentLeft[i].id != tabName.toString())
            tabcontentLeft[i].style.display = "none";
    }
}

function openTabRight(evt, tabName) {
    var i, tabcontentRight, tablinksRight;

    if (!document.isInit) {
        document.isInit = 1;
        tabcontentRight = document.getElementsByClassName("tabcontentRight");
        for (i = 0; i < tabcontentRight.length; i++) {
            tabcontentRight[i].style.display = "none";
        }
    }

    tablinksRight = document.getElementsByClassName("tablinksRight");
    for (i = 0; i < tablinksRight.length; i++) {
        if (tablinksRight[i].hasAttribute("target", "active")) {
            tablinksRight[i].removeAttribute("target", "active");
        }
    }

    if (document.getElementById(tabName).style.display == "none") {
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.setAttribute("target", "active");

    }
    else {
        document.getElementById(tabName).style.display = "none";
        document.getElementById(tabName).className.replace("active", "");
        evt.currentTarget.removeAttribute("target", "active");
    }

    tabcontentRight = document.getElementsByClassName("tabcontentRight");
    for (i = 0; i < tabcontentRight.length; i++) {
        if (tabcontentRight[i].id != tabName.toString())
            tabcontentRight[i].style.display = "none";
    }
}

function openTabInfo(evt, tabName) {
    var i, tabcontentInfo, tablinksInfo;

    if (!document.isInit) {
        document.isInit = 1;
        tabcontentInfo = document.getElementsByClassName("tabcontentInfo");
        for (i = 0; i < tabcontentInfo.length; i++) {
            tabcontentInfo[i].style.display = "none";
        }
    }

    tablinksInfo = document.getElementsByClassName("tablinksInfo");
    for (i = 0; i < tablinksInfo.length; i++) {
        if (tablinksInfo[i].hasAttribute("target", "active")) {
            tablinksInfo[i].removeAttribute("target", "active");
        }
    }

    if (document.getElementById(tabName).style.display == "none") {
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.setAttribute("target", "active");
    }
    else {
        document.getElementById(tabName).style.display = "none";
        document.getElementById(tabName).className.replace("active", "");
        evt.currentTarget.removeAttribute("target", "active");
    }

    tabcontentInfo = document.getElementsByClassName("tabcontentInfo");
    for (i = 0; i < tabcontentInfo.length; i++) {
        if (tabcontentInfo[i].id != tabName.toString())
            tabcontentInfo[i].style.display = "none";
    }
}

function openTabGraphs(evt, tabName) {
    var i, tabcontentGraphs, tablinksGraphs;

    if (!document.isInit) {
        document.isInit = 1;
        tabcontentGraphs = document.getElementsByClassName("tabcontentGraphs");
        for (i = 0; i < tabcontentGraphs.length; i++) {
            tabcontentGraphs[i].style.display = "none";
        }
    }

    tablinksGraphs = document.getElementsByClassName("tablinksGraphs");
    for (i = 0; i < tablinksGraphs.length; i++) {
        if (tablinksGraphs[i].hasAttribute("target", "active")) {
            tablinksGraphs[i].removeAttribute("target", "active");
        }
    }

    if (document.getElementById(tabName).style.display == "none") {
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.setAttribute("target", "active");
    }
    else {
        document.getElementById(tabName).style.display = "none";
        document.getElementById(tabName).className.replace("active", "");
        evt.currentTarget.removeAttribute("target", "active");
    }

    tabcontentGraphs = document.getElementsByClassName("tabcontentGraphs");
    for (i = 0; i < tabcontentGraphs.length; i++) {
        if (tabcontentGraphs[i].id != tabName.toString())
            tabcontentGraphs[i].style.display = "none";
    }
}

function openRightTabTour(evt, tabName) {
    var i, tabcontentRight, tablinksRight;

    if (!document.isInit) {
        document.isInit = 1;
        tabcontentRight = document.getElementsByClassName("tabcontentRight");
        for (i = 0; i < tabcontentRight.length; i++) {
            tabcontentRight[i].style.display = "none";
        }
    }

    tablinksRight = document.getElementsByClassName("tablinksRight");
    for (i = 0; i < tablinksRight.length; i++) {
        if (tablinksRight[i].hasAttribute("target", "active")) {
            tablinksRight[i].removeAttribute("target", "active");
        }
    }

    if (document.getElementById(tabName).style.display == "none") {
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.setAttribute("target", "active");
    }

    tabcontentRight = document.getElementsByClassName("tabcontentRight");
    for (i = 0; i < tabcontentRight.length; i++) {
        if (tabcontentRight[i].id != tabName.toString())
            tabcontentRight[i].style.display = "none";
    }
}

function openEventInfoTab(evt) {
    var i, tabcontentInfo, tablinksInfo;

    tablinksInfo = document.getElementsByClassName("tablinksInfo");
    for (i = 0; i < tablinksInfo.length; i++) {
        if (tablinksInfo[i].hasAttribute("target", "active")) {
            tablinksInfo[i].removeAttribute("target", "active");
        }
    }

    tabcontentInfo = document.getElementsByClassName("tabcontentInfo");
    for (i = 0; i < tabcontentInfo.length; i++) {
        if (tabcontentInfo[i].id != 'event_info'.toString())
            tabcontentInfo[i].style.display = "none";
    }
    evt.currentTarget.setAttribute("target", "active");
    document.getElementById('event_info').style.display = "block"
}

$('.tabcontentLeft').perfectScrollbar();
$('.tabcontentRight').perfectScrollbar();
$('.tabcontentInfo').perfectScrollbar();
$('.tabcontentGraphs').perfectScrollbar();

function checkNumber(box) {
    var coords = box.value;
    var Latitude = parseFloat((coords.split(",")[0]));
    var Longitude = parseFloat((coords.split(",")[1]));
    if (Latitude > 90 || Latitude < -90) {
        alert('Please enter a valid Latitude between 90 and -90');
    } else if (Longitude > 180 || Longitude < -180) {
        alert('Please enter a valid Longitude between 180 and -180');
    }
}