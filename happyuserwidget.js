var url, widget, html = document.querySelector('html'),
    div = document.createElement('div'),
    span = document.createElement('span'),
    text = document.createElement('span'),
    opt = document.createElement('div'),
    socialclass = ['fa fa-linkedin', 'fa fa-facebook', 'fa fa-xing', 'fa fa-twitter'],
    shareLink = [];

// example request with data object
url = location + 'json_samples/showQuestionResponse.json';
postAjax(url, window.happyuser.q[0][0], function(data) {
    if (data.showSurvey) {
        widget = new classWidget(data);
        widget.survey(widget.surveystructure);
        //console.log(widget);
    }
}, true);

//create class widget
function classWidget(objsurvey) {
    this.happyuser = window.happyuser.q[0][0];
    this.surveystructure = objsurvey;
}

classWidget.prototype.survey = (surveystructure) => {
    var scalelink = '';
    //console.log(surveystructure);

    div.style.paddingTop = 6 + 'px';
    div.style.paddingRight = 12 + 'px';
    div.style.paddingBottom = 6 + 'px';
    div.style.paddingLeft = 12 + 'px';
    div.style.webkitAnimation = 'from {opacity: 0;} to {opacity: 1;}';
    div.style.animation = 'from {opacity: 0;} to {opacity: 1;}';
    div.style.position = 'absolute';
    div.style.bottom = 0 + 'px';
    div.style.left = 8 + '%';
    div.style.border = '1px ' + surveystructure.bgColor + ' solid';
    div.style.width = 80 + '%';
    div.style.height = 100 + 'px';
    div.style.backgroundColor = surveystructure.bgColor;
    div.style.color = surveystructure.txtColor;
    div.align = 'center';

    span.className = 'closeWidget';
    span.style.cssText = 'border-radius: 30px';
    span.style.paddingTop = 2 + 'px';
    span.style.paddingRight = 6 + 'px';
    span.style.paddingBottom = 2 + 'px';
    span.style.paddingLeft = 6 + 'px';
    span.style.cssFloat = 'right';
    span.style.cursor = 'pointer';
    span.style.fontSize = 12 + 'px';
    span.style.border = '1px solid #AEAEAE';
    span.style.color = '#AEAEAE';
    span.innerHTML = 'x';

    text.style.top = 20 + '%';
    text.style.left = 0 + 'px';
    text.style.width = 100 + '%';
    text.style.position = 'absolute';
    text.innerHTML = surveystructure.npsSettings.npsText;

    for (var i = 1; i <= 10; i++) {
        scalelink += '<a class="scale" href="javascript:void(0);">' + i + '</a>';
    }

    opt.style.display = 'inline-block';
    opt.style.bottom = 10 + 'px';
    opt.style.left = 0 + 'px';
    opt.style.width = 100 + '%';
    opt.style.position = 'absolute';
    opt.innerHTML = scalelink;

    div.appendChild(span);
    div.appendChild(text);
    div.appendChild(opt);
    html.appendChild(div);

    setScalelink(surveystructure.npsSettings.npsBgColor, surveystructure.txtColor);
    setCloseWidget();
}

function setCloseWidget() {
    document.querySelector('.closeWidget').addEventListener('mouseover', (event) => {
        event.target.style.color = 'red';
        event.target.style.border = '1px solid red';
    }, false);
    document.querySelector('.closeWidget').addEventListener('mouseout', (event) => {
        event.target.style.color = '#AEAEAE';
        event.target.style.border = '1px solid #AEAEAE';
    }, false);
    document.querySelector('.closeWidget').addEventListener('click', (event) => {
        event.target.parentElement.style.display = 'none';
    }, false);
}

function setScalelink(bgColor, txtColor) {
    var elm = document.querySelectorAll('.scale');
    for (var i = 0; i <= elm.length - 1; i++) {
        elm[i].style.cssText = 'text-decoration:none';
        elm[i].style.cssFloat = 'center';
        elm[i].style.display = 'inline-block';
        elm[i].style.paddingTop = 10 + 'px';
        elm[i].style.paddingRight = 16 + 'px';
        elm[i].style.paddingBottom = 10 + 'px';
        elm[i].style.paddingLeft = 16 + 'px';
        elm[i].style.marginTop = 0 + 'px';
        elm[i].style.marginRight = 4 + 'px';
        elm[i].style.marginBottom = 0 + 'px';
        elm[i].style.marginLeft = 4 + 'px';
        elm[i].style.border = '1px solid ' + bgColor;
        elm[i].style.backgroundColor = bgColor;
        elm[i].style.color = txtColor;

        if (i + 1 <= 6) {
            elm[i].addEventListener('mouseover', (event) => {
                event.target.style.backgroundColor = '#ef3d47';
            }, false);
            elm[i].addEventListener('mouseout', (event) => {
                event.target.style.backgroundColor = bgColor;
            }, false);
        } else if ((i + 1 >= 7) && (i + 1 <= 8)) {
            elm[i].addEventListener('mouseover', (event) => {
                event.target.style.backgroundColor = 'grey';
            }, false);
            elm[i].addEventListener('mouseout', (event) => {
                event.target.style.backgroundColor = bgColor;
            }, false);
        } else if ((i + 1 >= 9) && (i + 1 <= 10)) {
            elm[i].addEventListener('mouseover', (event) => {
                event.target.style.backgroundColor = '#90EE90';
            }, false);
            elm[i].addEventListener('mouseout', (event) => {
                event.target.style.backgroundColor = bgColor;
            }, false);
        }

        elm[i].addEventListener('click', (event) => {
            //console.log(event.target.textContent);
            var rating = {}
            rating['rating'] = event.target.textContent;
            rating['questionKey'] = window.happyuser.q[0][0].questionKey;
            rating['userId'] = window.happyuser.q[0][0].userId;
            rating['referrer'] = window.happyuser.q[0][0].referrer;
            rating['traits'] = window.happyuser.q[0][0].traits;
            rating['timeShown'] = 1 * new Date();
            //console.log(rating);

            url = location + 'json_samples/npsRatingResponse_categories.json';
            postAjax(url, rating, function(data) {
                if (data.viewType === 'categories') {
                    //console.log(rating);
                    setCategoriesLink(data);
                }
            }, true);
        }, false);
    }
}

function setCategoriesLink(Categories) {
    //console.log(Categories);
    var btncetegories = '';
    text.innerHTML = Categories.categoriesQuestionText;
    Categories.categories.forEach(function(Category, idx, array) {
        //console.log(Category);
        btncetegories += '<button class="categories">' + Category.value + '</button>';
        opt.innerHTML = btncetegories;
    }, this);

    setBtnCategories(Categories);
}

function setBtnCategories(Categories) {
    var elm = document.querySelectorAll('.categories'),
        baseColor = 'white',
        catColor = new Array(),
        nodes = Array.prototype.slice.call(document.getElementsByClassName('categories')),
        categories = Categories.categories;
    for (var i = 0; i <= elm.length - 1; i++) {
        catColor.push(categories[i].color);
        elm[i].style.cssText = 'text-decoration:none;text-align: center;border-radius: 30px';
        elm[i].style.fontSize = 16 + 'px';
        elm[i].style.display = 'inline-block';
        elm[i].style.paddingTop = 10 + 'px';
        elm[i].style.paddingRight = 16 + 'px';
        elm[i].style.paddingBottom = 10 + 'px';
        elm[i].style.paddingLeft = 16 + 'px';
        elm[i].style.marginTop = 0 + 'px';
        elm[i].style.marginRight = 4 + 'px';
        elm[i].style.marginBottom = 0 + 'px';
        elm[i].style.marginLeft = 4 + 'px';
        elm[i].style.cursor = 'pointer';
        elm[i].style.backgroundColor = baseColor;
        elm[i].style.color = catColor[i];
        elm[i].style.border = '2px solid ' + catColor[i];

        elm[i].addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = catColor[nodes.indexOf(event.target)];
            event.target.style.color = baseColor;
        }, false);
        elm[i].addEventListener('mouseout', (event) => {
            event.target.style.backgroundColor = baseColor;
            event.target.style.color = catColor[nodes.indexOf(event.target)];
        }, false);

        elm[i].addEventListener('click', (event) => {
            var chosenCategory = {}
            chosenCategory['questionResponseId'] = Categories.questionResponseId;
            chosenCategory['categoryId'] = Categories.categories[nodes.indexOf(event.target)].id;
            chosenCategory['questionKey'] = window.happyuser.q[0][0].questionKey;
            chosenCategory['userId'] = window.happyuser.q[0][0].userId;
            chosenCategory['referrer'] = window.happyuser.q[0][0].referrer;
            chosenCategory['traits'] = window.happyuser.q[0][0].traits;
            chosenCategory['timeShown'] = 1 * new Date();
            //console.log(chosenCategory);

            url = location + 'json_samples/chosenCategoryResponse.json';
            postAjax(url, chosenCategory, function(data) {
                if (data.viewType === 'textQuestion') {
                    //console.log(chosenCategory);
                    setCategoryQuestion(data);
                }
            }, true);

        }, false);
    }
}

function setCategoryQuestion(Question) {
    //console.log(Question);
    text.innerHTML = Question.textfieldQuestion;
    opt.innerHTML = '';

    var txtArea = document.createElement('textarea');
    txtArea.cols = 50;
    txtArea.rows = 3;
    txtArea.style.fontSize = 12 + 'px';
    txtArea.placeholder = Question.placeHolderText;
    txtArea.style.verticalAlign = 'bottom';
    txtArea.style.display = 'inline-block';
    txtArea.className = 'category-message';

    var btnsend = document.createElement('input');
    btnsend.type = 'button';
    btnsend.value = Question.sendButtonText;
    btnsend.style.cssText = 'text-align: center;border-radius: 5px';
    btnsend.style.fontSize = 12 + 'px';
    btnsend.style.padding = 10 + 'px ' + 16 + 'px';
    btnsend.style.margin = 0 + 'px ' + 16 + 'px';
    btnsend.style.cursor = 'pointer';
    btnsend.style.backgroundColor = '#008CBA';
    btnsend.style.color = 'white';
    btnsend.style.border = '2px solid #008CBA';
    btnsend.style.position = 'relative';
    btnsend.style.display = 'inline-block';

    opt.appendChild(btnsend);
    opt.insertBefore(txtArea, btnsend);

    btnsend.addEventListener('click', () => {
        var messageQuestion = {}
        messageQuestion['questionResponseId'] = Question.questionResponseId;
        messageQuestion['message'] = document.getElementsByClassName('category-message')[0].value;
        messageQuestion['questionKey'] = window.happyuser.q[0][0].questionKey;
        messageQuestion['userId'] = window.happyuser.q[0][0].userId;
        messageQuestion['referrer'] = window.happyuser.q[0][0].referrer;
        messageQuestion['traits'] = window.happyuser.q[0][0].traits;
        messageQuestion['timeShown'] = 1 * new Date();
        //console.log(messageQuestion);

        url = location + 'json_samples/npsRatingResponse_social-icons.json';
        postAjax(url, messageQuestion, function(data) {
            if (data.viewType === 'social-icons') {
                //console.log(messageQuestion);
                setSocialIcon(data);
            }
        }, true);

    }, false);

}

function setSocialIcon(SocialIcon) {
    loadjscssfile('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', 'css');
    text.innerHTML = SocialIcon.socialText;
    opt.innerHTML = '';

    SocialIcon['social-icons'].forEach(function(icons, idx, arr) {
        var btnSocial = document.createElement('a');
        switch (idx) {
            case 0:
                btnSocial.className = 'fa fa-linkedin';
                break;
            case 1:
                btnSocial.className = 'fa fa-facebook';
                break;
            case 2:
                btnSocial.className = 'fa fa-xing';
                break;
            default:
                btnSocial.className = 'fa fa-twitter';
        }
        btnSocial.style.cssText = 'text-align:center;border-radius:5px;';
        btnSocial.style.fontSize = 26 + 'px';
        btnSocial.style.padding = 10 + 'px ' + 16 + 'px';
        btnSocial.style.margin = 0 + 'px ' + 5 + 'px';
        btnSocial.style.cursor = 'pointer';
        btnSocial.style.backgroundColor = '#BFE0F8';
        btnSocial.style.color = 'white';
        btnSocial.style.border = '2px solid #BFE0F8';
        btnSocial.style.position = 'relative';
        btnSocial.style.display = 'inline-block';

        opt.appendChild(btnSocial);

        btnSocial.addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = '#4285F4';
            event.target.style.color = '#BFE0F8';
            event.target.style.border = '2px solid #4285F4';
        }, false);
        btnSocial.addEventListener('mouseout', (event) => {
            event.target.style.backgroundColor = '#BFE0F8';
            event.target.style.color = 'white';
            event.target.style.border = '2px solid #BFE0F8';
        }, false);

        btnSocial.addEventListener('click', () => {
            switch (idx) {
                case 0:
                    Shareit('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent('http://www.happyuser.se/') + '&title=happyuser&summary = ' + SocialIcon.predefinedShareText + '& source=LinkedIn&comment=jhjkhkjh ');
                    break;
                case 1:
                    Shareit('http://www.facebook.com/share.php?u=' + encodeURIComponent('http://www.happyuser.se/') + '&title=happyuser&quote=' + SocialIcon.predefinedShareText);
                    break;
                case 2:
                    Shareit('https://www.xing.com/spi/shares/new?cb=0&url=' + encodeURIComponent('http://www.happyuser.se/') + '&follow_url=' + encodeURIComponent('http://www.happyuser.se/'));
                    break;
                default:
                    Shareit('https://twitter.com/share?url=' + encodeURIComponent('http://www.happyuser.se/') + '&via=happyuser&related=happyuser,happyuser&hashtags=happyuser,happyuser&text=' + SocialIcon.predefinedShareText);
            }
            finalMessage(SocialIcon.questionResponseId, SocialIcon['social-icons'][idx].id);
        }, false);
    }, this);
}

function setFinnalRes(message) {
    text.style.top = 50 + '%';
    text.innerHTML = message.thankYouText;
    opt.innerHTML = '';
}

function finalMessage(questionResponseId, socialType) {
    var messageSend = {}
    messageSend['questionResponseId'] = questionResponseId;
    messageSend['socialIconId'] = socialType;
    messageSend['questionKey'] = window.happyuser.q[0][0].questionKey;
    messageSend['userId'] = window.happyuser.q[0][0].userId;
    messageSend['referrer'] = window.happyuser.q[0][0].referrer;
    messageSend['traits'] = window.happyuser.q[0][0].traits;
    messageSend['timeShown'] = 1 * new Date();
    url = location + 'json_samples/npsRatingResponse_message.json';
    postAjax(url, messageSend, function(data) {
        if (data.viewType === 'message') {
            //console.log(messageSend);
            setFinnalRes(data);
        }
    }, true);
}

function Shareit(url) {
    var strWindowFeatures = 'menubar=no,location=yes,resizable=yes,scrollbars=yes,'
    strWindowFeatures += 'status=yes,height=600,width=600';
    newwindow = window.open(url, 'happyuser', strWindowFeatures);
    if (window.focus) {
        newwindow.focus();
    }

    return false;
}

function loadjscssfile(filename, filetype) {
    if (filetype == 'js') {
        var jscssfile = document.createElement('script');
        jscssfile.type = 'text/javascript';
        jscssfile.src = filename;
        if (typeof jscssfile != "undefined")
            document.getElementsByTagName("head")[0].appendChild(jscssfile);
    } else if (filetype == 'css') {
        if (document.createStyleSheet) {
            document.createStyleSheet(filename);
        } else {
            var styles = '@import url(\'' + filename + '\');';
            var cssfile = document.createElement('link');
            cssfile.rel = 'stylesheet';
            cssfile.href = 'data:text/css,' + escape(styles);
            if (typeof cssfile != 'undefined')
                document.getElementsByTagName('head')[0].appendChild(cssfile);
        }
    }
}

function postAjax(url, data, success, async) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');
    //console.log(params);
    var http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    http.open('POST', url, async);
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            try {
                //console.log(http.responseText)
                success(JSON.parse(http.responseText));
            } catch (e) {
                console.log(e);
            }

        }
    };
    http.setRequestHeader("Content-type", "application/json");
    http.send(params);
    return http;
}