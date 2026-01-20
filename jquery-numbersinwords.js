(function($) {

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //// NUMBERS IN WORDS
    //// Numbers by Extension v.3.2 git
    ////
    //// v.1.0 15.01.2026 jquery version
    ////
    //// created by: Mario Proenca
    ////
    //// 1 - Numbers in words
    //// OPTIONS
    //// short scale    BR US
    //// long scale     PT UK

    //// @string number to convert
    //// @string scale - default long scale PT
    ////
    //// $('#id').numbersInWords('1523,45','PT');
    ////
    ////
    ////
    //// 2 - Money in words
    //// OPTIONS
    //// short scale    BR US
    //// long scale     PT UK
    //// coin           EUR USD

    //// @string number to convert
    //// @string scale - default long scale PT
    //// @string coin  - default EUR
    ////
    //// $('#id').moneyInWords('1523,45','PT','EUR');
    ////
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    // ------- Properties -------
    var numUnitsArrPT        = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "catorze", "quinze", "dezasseis", "dezassete", "dezoito", "dezanove"];
    var numUnitsArrBR        = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    var numDozensArr         = ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa", "cem"];
    var numHundredsArr       = ["cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos", "mil"];
    var numThousandsShortArr = ["", "mil", "milhão", "bilião", "trilião", "quatrilhão", "quintilião", "sextilião", "septilião", "octilião", "nonilião", "decilião", "undecilião", "duodecilião", "tredecilião", "quatridecilião", "quindecilião", "sexdecilião", "septendecilião", "octodecilião", "novendecilião", "vigintilião", "unvigintilião", "duovigintilião", "trivigintilião", "quatrivigintilião", "quinquavigintilião"];
    var numThousandsLongArr  = ["", "mil", "milhão", "mil milhões", "bilião", "mil biliões", "trilião", "mil triliões", "quatrilião", "mil quatriliões", "quintilião", "mil quintiliões", "sextilião", "mil sextiliões", "septilião", "mil septiliões", "octilião", "mil octiliões", "nonilião", "mil noniliões", "decilião", "mil deciliões", "undecilião", "mil undeciliões", "duodecilião", "mil duodeciliões", "tredecilião", "mil tredeciliões", "quatridecilião", "mil quatrideciliões", "quindecilião", "mil quindeciliões", "sexdecilião", "mil sexdeciliões", "septendecilião", "mil septendeciliões", "octodecilião", "mil octodeciliões", "novendecilião", "mil novendeciliões", "vigintilião"];

    var numUnitsArrEN          = ["nought", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    var numDozensArrEN         = ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "one hundred"];
    var numHundredsArrEN       = ["one hundred", "two hundred", "three hundred", "four hundred", "five hundred", "six hundred", "seven hundred", "eight hundred", "nine hundred", "one hundred"];
    var numThousandsShortArrEN = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion", "unvigintillion", "duovigintillion", "trevigintillion", "quattuorvigintillion", "quinvigintillion", "sexvigintillion", "septenvigintillion", "octovigintillion", "novemvigintillion", "trigintillion"];
    var numThousandsLongArrEN  = ["", "thousand", "million", "thousand million", "billion", "thousand billion", "trillion", "thousand trillion", "quadrillion", "thousand quadrillion", "quintillion", "thousand quintillion", "sextillion", "thousand sextillion", "septillion", "thousand septillion", "octillion", "thousand octillion", "nonillion", "thousand nonillion", "decillion", "thousand decillion", "undecillion", "thousand undecillion", "duodecillion", "thousand duodecillion", "tredecillion", "thousand tredecillion", "quattuordecillion", "thousand quattuordecillion", "quindecillion", "thousand quindecillion", "sexdecillion", "thousand sexdecillion", "septendecillion", "thousand septendecillion", "octodecillion", "thousand octodecillion", "novemdecillion", "thousand novemdecillion", "vigintillion", "thousand vigintillion"];
    var typeNum                = [{id: "EUR", leftSingular: "euro", leftPlural: "euros", rightSingular: "cêntimo", rightPlural: "cents"},
        {id: "USD", leftSingular: "dollar", leftPlural: "dollars", rightSingular: "cent", rightPlural: "cents"}];

    var numericalValue      = numericalValuecheck = "";
    var lang;
    var currencyName        = "euro";
    var extensiveResult     = "";
    var nS                  = "";
    var nSc                 = "";
    var e                   = 0;
    var centavos            = false;
    var centavosFindInitial = /[\.]/;
    var centavosFind        = /[\,]/;
    var unidezcemCents;
    var centsExtensive      = "";
    var extensiveNumbers    = "";
    var extensiveCents      = "";


    $.fn.numbersInWords = function(numericalValue, acronym = "PT") {

        lang = acronym;
        nS   = nSc = "";
        nS   = String(numericalValue).replace(" ", "").replace(".", ",").trim();
        e    = Number(nS);

        //check the existence of cents
        if(nS.search(centavosFind) != -1) {
            centavos = true;
            var arr  = [];
            arr      = nS.split(centavosFind, 2);
            nS       = String(arr[0]);
            e        = Number(arr[0]);
            nSc      = String(arr[1]).substr(0, 2);


        }


        unidezcemCents = Number(nSc.substr(0, 2));

        //count how many hundreds there are
        /// 000 000 000 000 000 = 5
        /// 00 000 000 = 3
        /// 0 000 000 000 = 4
        var cNum = parseInt(Math.ceil(nS.length / 3));

        //Write in increments of one hundred in ascending order.
        // 00 000 000 000
        // 1   2   3   4
        for(var i = 0; i < cNum; i++) {
            var space          = " ";
            var separator      = "";
            var singularPlural = "";
            var n;

            //count how many units are in the last hundred
            /// X00 000 000 000 = 3
            /// X0 000 000 000 = 2
            /// X 000 000 000 = 1
            var r = parseInt(3 - (((3 * cNum) - nS.length)));

            if(i == 0) {
                n = Number(nS.substr(0, r));
            } else {
                n = Number(nS.substr(r + (3 * (i - 1)), 3));
            }

            if(n != 0) {
                if(i > 0) {
                    //if the hundred is less than 100, i.e., two numbers
                    //and if they are integer values ​​100 200 300 ... 900 use the separator " and "
                    //and if it is not in the first or last hundred
                    if(lang == "PT" || lang == "BR") {
                        if(n >= 1 && n < 100) {
                            separator = " e ";
                            if(i != cNum - 1) {
                                separator = ", ";
                            }
                        } else {
                            //separator = ", ";
                            if(i == cNum - 1 && Number(String(n).substr(-2, 2) == '00')) {
                                separator = " e ";
                            } else {
                                separator = ", ";
                            }
                        }
                    }
                    if(lang == "UK" || lang == "US") {
                        if(n >= 1 && n < 100) {
                            separator = " and ";
                            if(i != cNum - 1) {
                                separator = ", ";
                            }
                        } else {
                            //separator = ", ";
                            if(i == cNum - 1 && Number(String(n).substr(-2, 2) == '00')) {
                                separator = " and ";
                            } else {
                                separator = ", ";
                            }
                        }
                    }
                }

                //checks the plural of words
                //case value of hundred n greater than 1
                if(n > 1 && (cNum) - (i + 1) > 1) {

                    if(lang == "BR") {
                        //SHORT mudar de ão para ões
                        singularPlural = String(numThousandsShortArr[(cNum) - (i + 1)]).substr(0, numThousandsShortArr[(cNum) - (i + 1)].length - 2) + "ões";
                    }
                    if(lang == "PT") {
                        //LONGA mudar de ão para ões
                        if(String(numThousandsLongArr[(cNum) - (i + 1)]).substr(-2, 2) == "ão") {
                            singularPlural = String(numThousandsLongArr[(cNum) - (i + 1)]).substr(0, numThousandsLongArr[(cNum) - (i + 1)].length - 2) + "ões";
                        } else {
                            singularPlural = numThousandsLongArr[(cNum) - (i + 1)];
                        }
                    }

                    if(lang == "US") {
                        //SHORT
                        singularPlural = String(numThousandsShortArrEN[(cNum) - (i + 1)]) + "s";
                    }
                    if(lang == "UK") {
                        //Longa
                        singularPlural = String(numThousandsLongArrEN[(cNum) - (i + 1)]) + "s";
                    }


                } else {
                    //SHORT use ão
                    if(lang == "BR") {
                        singularPlural = numThousandsShortArr[(cNum) - (i + 1)];
                    }
                    //LONGA use ão
                    if(lang == "PT") {
                        singularPlural = numThousandsLongArr[(cNum) - (i + 1)];
                    }
                    //SHORT
                    if(lang == "US") {
                        singularPlural = numThousandsShortArrEN[(cNum) - (i + 1)];
                    }
                    //LONGA
                    if(lang == "UK") {
                        singularPlural = numThousandsLongArrEN[(cNum) - (i + 1)];
                    }
                }
                //checks if the number is different from 1
                //checks if the number is in the thousands place and starts with 1
                if(n == 1 && e <= 1999 && e > 1) {
                    n         = 0;
                    space     = " ";
                    separator = "";
                    if(lang == "UK" || lang == "US") {
                        // one thousand
                        separator = " one ";
                    }
                }
                if(lang == "PT" || lang == "UK") {
                    //thousands de million
                    if(n == 1 && (nS.length == 10 || nS.length == 16 || nS.length == 22 || nS.length == 28 || nS.length == 34)) {
                        n = 0;
                    }
                }
                //write the result to the variable
                extensiveResult += separator + hundredsValue(n) + space + singularPlural;
            } else {
                //If the last hundred is zero, add a space.
                if(i == cNum - 1) {
                    if(extensiveResult.substr(-3, 3) == "ões") {
                        space = " de ";
                    }
                    extensiveResult += space;
                }
            }
        }


        //Clear text when there are no values.
        //ou o value for igual a zero

        if(e == 0 || nS.length == 0) {
            currencyName    = "";
            extensiveResult = "";
            centsExtensive  = "";
        }
        extensiveNumbers = extensiveResult;

        //centavos

        if(centavos) {
            if(nSc.length == 1) {
                unidezcemCents = unidezcemCents * 10;
            }
            if(e == 0) {
                extensiveResult = dozensUnitsValue(unidezcemCents);
            } else {
                if(lang == "PT" || lang == "BR") {
                    centsExtensive = " vírgula " + dozensUnitsValue(unidezcemCents);
                }
                if(lang == "UK" || lang == "US") {
                    centsExtensive = " and " + dozensUnitsValue(unidezcemCents);
                }
            }
        }
        //extensiveCents=centsExtensive;
        //add currency + cents to the variable
        extensiveResult += centsExtensive;

        //write result

        valueextensive  = extensiveResult;
        var capitalized = valueextensive.charAt(0).toUpperCase() + valueextensive.slice(1);
        return this.html(capitalized.split(/\s+/).join(' '));

    };


    $.fn.moneyInWords = function(numericalValue, acronym = "PT", coin = "") {

        lang = acronym;

        extensiveResult = centsExtensive = currencyName = separatorDecimal = textCentimos = unidezcemCents = "";


        this.numbersInWords(numericalValue, lang);
        extensiveResult = extensiveNumbers;


        var typeSelected = [];

        for(var i in typeNum) {
            if(typeNum[i].id == coin) {
                typeSelected = typeNum[i];
            }
        }
        //define the plural of currency
        if(e == 0) {
            currencyName = "";
        } else if(e == 1) {
            currencyName = (typeof typeSelected['leftSingular'] !== 'undefined') ? typeSelected['leftSingular'] : "";

        } else {
            currencyName = (typeof typeSelected['leftPlural'] !== 'undefined') ? typeSelected['leftPlural'] : "";
        }


        if(centavos) {

            var n = Number(nSc);

            if(coin != "") {
                if(unidezcemCents == '01') {
                    textCentimos = (typeof typeSelected['rightSingular'] !== 'undefined') ? " " + typeSelected['rightSingular'] : "";
                } else {
                    textCentimos = (typeof typeSelected['rightPlural'] !== 'undefined') ? " " + typeSelected['rightPlural'] : "";
                }
            }

            if(n == 0) {
                textCentimos = "";
            }
            if(String(numericalValue).search(/[,.]/g) != -1 && n > 0) {

                if(lang == "PT" || lang == "BR") {
                    separatorDecimal = " e ";
                }
                if(lang == "UK" || lang == "US") {
                    separatorDecimal = " and ";
                }
            }

            if(e == 0) {
                extensiveResult = dozensUnitsValue(unidezcemCents) + textCentimos;
            } else {
                centsExtensive = separatorDecimal + dozensUnitsValue(unidezcemCents) + textCentimos;
            }


        }
        //add currency + cents to the variable
        extensiveResult += currencyName + centsExtensive;
        var resultToDisplay = extensiveResult;
        extensiveResult     = '';
        resultToDisplay;
        return this.html(resultToDisplay.charAt(0).toUpperCase() + resultToDisplay.slice(1).split(/\s+/).join(' ') + ".");

    };

    //////////////////////////////////////////////////////////////////////////
    //FUNCTIONS
    //////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////units + dozens
    var dozensUnitsValue = function(uni) {
        //0X
        var firstNum         = Number(String(uni).substr(-1, 1));
        //X0
        var secondNum        = Number(String(uni).substr(-2, 1));
        var dozensUnitsValue = "";
        //units e dozens
        if(uni > 0 && uni < 20) {
            if(lang == "PT") {
                dozensUnitsValue = String(numUnitsArrPT[uni]);
            }
            if(lang == "BR") {
                dozensUnitsValue = String(numUnitsArrBR[uni]);
            }
            if(lang == "UK" || lang == "US") {
                dozensUnitsValue = String(numUnitsArrEN[uni]);
            }


        }
        if(uni >= 20 && uni <= 99) {
            // X0
            if(firstNum == 0) {
                if(lang == "PT" || lang == "BR") {
                    dozensUnitsValue = String(numDozensArr[secondNum - 1]);
                }
                if(lang == "UK" || lang == "US") {
                    dozensUnitsValue = String(numDozensArrEN[secondNum - 1]);
                }

            }
            // XX
            if(firstNum != 0) {
                if(lang == "PT" || lang == "BR") {
                    dozensUnitsValue = String(numDozensArr[secondNum - 1]) + " e " + String(numUnitsArrPT[firstNum]);
                }
                if(lang == "UK" || lang == "US") {
                    dozensUnitsValue = String(numDozensArrEN[secondNum - 1]) + "-" + String(numUnitsArrEN[firstNum]);
                }
            }
        }
        return dozensUnitsValue;
    }


    //////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////hundreds
    var hundredsValue = function(v) {
        var hundredsValue = "";
        if(v != 0) {
            //00X
            var unit    = Number(String(v).substr(-1, 1));
            //0X0
            var dozen   = Number(String(v).substr(-2, 1));
            //0XX
            var dozens  = Number(String(v).substr(-2, 2));
            //X00
            var hundred = Number(String(v).substr(-3, 1));
            //hundreds
            if(lang == "PT" || lang == "BR") {
                var valueHundreds = String(numHundredsArr[hundred - 1]);
            }
            if(lang == "UK" || lang == "US") {
                var valueHundreds = String(numHundredsArrEN[hundred - 1]);
            }

            if(v < 100) {
                hundredsValue = dozensUnitsValue(dozens);
            }
            if(v == 100) {
                if(lang == "PT" || lang == "BR") {
                    hundredsValue = "cem";
                }
                if(lang == "UK" || lang == "US") {
                    hundredsValue = "one hundred";
                }
            }
            if(v > 100 && v <= 199) {

                if(lang == "PT" || lang == "BR") {
                    hundredsValue = "cento" + " e " + dozensUnitsValue(dozens);
                }
                if(lang == "UK" || lang == "US") {
                    hundredsValue = "one hundred" + " and " + dozensUnitsValue(dozens);
                }
            }
            if(v >= 200 && v < 1000) {
                // X00
                if(hundred != 0 && dozen == 0 && unit == 0) {
                    hundredsValue = valueHundreds;
                } else {// 0X0  00X  XX0  0XX  X0X  XXX
                    if(lang == "PT" || lang == "BR") {
                        hundredsValue = valueHundreds + " e " + dozensUnitsValue(dozens);
                    }
                    if(lang == "UK" || lang == "US") {
                        hundredsValue = valueHundreds + " and " + dozensUnitsValue(dozens);
                    }
                }
            }
        }
        return hundredsValue;
    }

}(jQuery));
