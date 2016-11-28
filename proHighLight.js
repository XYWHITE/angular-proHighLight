/**
 * Created by baixiyang on 2016/11/22.
 */
angular.module("proHighLight",[])
    .filter("proHighLight", function () {
        function parseHTML(text) {
            return $("<div>").text(text).html();
        }

        function parsePattern(text) {
            return text.replace(/[\$\(\)\*\+\-\.\[\]\?\\\^\{\}\|]/g, "\\$&");
        }

        return function (text, search, caseSensitive) {
            if (text && (search || angular.isNumber(search))) {
                text = text.toString();
                search = search.toString();
                if (caseSensitive) {
                    var htmlTextArr = [];
                    $.each(text.split(search), function (index, value) {
                        htmlTextArr.push(parseHTML(value));
                    });
                    return htmlTextArr.join('<span class="ui-match">' + parseHTML(search) + '</span>');
                } else {
                    var lightWords = [];
                    var words = text.match(new RegExp(parsePattern(search), 'gi'));
                    if (words != null) {
                        $.each(words, function (index, value) {
                            lightWords.push('<span class="ui-match">' + parseHTML(value) + '</span>');
                        });
                    }
                    var textArr = text.split(new RegExp(parsePattern(search), 'gi'));
                    var finalText = "";
                    $.each(textArr, function (index, value) {
                        if (index != 0) {
                            finalText += lightWords[index - 1] + parseHTML(value);
                        } else {
                            finalText += parseHTML(value);
                        }
                    });
                    return finalText;
                }
            } else {
                return parseHTML(text);
            }
        };
    })
    .filter("parseBlankSymbol", function () {
        return function (value) {
            return value.replace(/[\n\r]/g, "<br>").replace(/( )/g, "&nbsp;").replace(/<span&nbsp;/g,"<span ");
        }
    });