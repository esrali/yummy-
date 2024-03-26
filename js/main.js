/*----------------------------------sideBar------------------------*/

let ulWidth =  $(".links").outerWidth(true);
$(".sidebar").animate({left:`-${ulWidth}`} ,0);

$(".fa-bars").click(function(){
// sidebar open===>hide
    if($(".sidebar").css("left")=="0px")
    {
        let ulWidth =  $(".links").outerWidth(true);
        $(".sidebar").animate({left:`-${ulWidth}`} ,500);
        $(".iii").removeClass("fa-xmark");
        $(".iii").addClass("fa-bars");
        $(".sidebar li").removeClass("animate__fadeInUpBig");
        $(".sidebar li").addClass("animate__fadeOutBottomLeft");
    }else{
        $(".sidebar").animate({left:`0px`} ,500);
        $(".iii").addClass("fa-xmark");
        $(".iii").removeClass("fa-bars");
        $(".sidebar li").removeClass("animate__fadeOutBottomLeft")
        $(".sidebar li").addClass("animate__fadeInUpBig")
    }
})

/* -------------------------------home ------------------------------- */
let api;
let apiData;

async function getMeal(){
    $(".loadingDiv").fadeIn(300);
    api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    apiData = await api.json();
    display();
    $(".loadingDiv").fadeOut(300);
}
getMeal();

let all;
function display(){
    all="";
    for(let i=0;i<apiData.meals.length;i++)
    {
        all+=`
                    <div class="col-md-3 rounded-2">
                        <div class="position-relative overflow-hidden hov" onclick="getDetails(`+i+`)">
                            <img src=${apiData.meals[i].strMealThumb} class="img-fluid rounded-2" >
                            <div class="layer d-flex align-items-center flex-wrap rounded-2 p-2">
                                <h2>${apiData.meals[i].strMeal}</h2>
                            </div>
                        </div>
                    </div>
                `
    }
    document.querySelector(".global .row1").innerHTML=all;
    
}
let apiIdData;

function getDetails(ind){
    let getId=apiData.meals[ind].idMeal;
    $(".loadingDiv").fadeIn(300);
    async function getDetailsById(){
        let apiId= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getId}`)
        apiIdData= await apiId.json();
        displayDetailsById();
        
    $(".loadingDiv").fadeOut(300);
    }
    getDetailsById();

}

function displayDetailsById(){
    document.querySelector(".global .row1").innerHTML="";
    document.querySelector(".global .row5").innerHTML="";
    document.querySelector(".global .row55").innerHTML="";
    let one="";
    for(let i=0 ; i<apiIdData.meals.length;i++)
    {
        one+=`
        <div class="col-lg-4">
        <div class="rounded-2">
            <img src=${apiIdData.meals[i].strMealThumb} class="img-fluid rounded-2" >
            <h2 class="text-white">${apiIdData.meals[i].strMeal}</h2>
        </div>
    </div>
    <div class="col-lg-8">
        <div class="text-white">
            <h1>Instructions</h1>
            <p>${apiIdData.meals[i].strInstructions}</p>
                <h3>Area : ${apiIdData.meals[i].strArea}</h3>
                <h3>Category : ${apiIdData.meals[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="d-flex flex-wrap rounded-2" style="list-style-type: none;">
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${apiIdData.meals[i].strMeasure1} ${apiIdData.meals[i].strIngredient1}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${apiIdData.meals[i].strMeasure2} ${apiIdData.meals[i].strIngredient2}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${apiIdData.meals[i].strMeasure3} ${apiIdData.meals[i].strIngredient3}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${apiIdData.meals[i].strMeasure4} ${apiIdData.meals[i].strIngredient4}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${apiIdData.meals[i].strMeasure5} ${apiIdData.meals[i].strIngredient5}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${apiIdData.meals[i].strMeasure6} ${apiIdData.meals[i].strIngredient6}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${apiIdData.meals[i].strMeasure7} ${apiIdData.meals[i].strIngredient7}</li>
                </ul>
                <h3>tages :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-danger m-2 p-1">${apiIdData.meals[i].strTags}</li>
                </ul>
                <a href="${apiIdData.meals[i].strSource}" target="_blank"><button class="btn btn-success">Source </button></a>
                <a href="${apiIdData.meals[i].strYoutube}" target="_blank"><button class="btn btn-danger">YouTube </button></a>
        </div>
    </div>
        `
    }
    document.querySelector(".global .row5").innerHTML=one;

}
/*-------------------------------loading screen------------------------------------ */
$(document).ready(function(){
    $(".loadingDiv").fadeOut(1000);
    $("html,body").css("overflow" ,"auto")
})

/*-----------------------------------search---------------------------------------------- */
let apiS;
let apiDataS;
$("#Search").click(function(){
    $("#contact").css("display","none");
    $("#search").css("display","block");
    $(".sidebar").animate({left:`-${ulWidth}`} ,500);
    $(".iii").removeClass("fa-xmark");
    $(".iii").addClass("fa-bars");
})
/*search by name */
async function getMealByName(nam){

    apiS = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nam}`);
    apiDataS = await apiS.json();
    displaySearch();
}
$("#name").keyup(function () { 
        let inputName=$("#name").val();
        getMealByName(inputName);
});
function displaySearch(){
    let cartona="";
    for(let i=0;i<apiDataS.meals.length;i++)
    {
        cartona+=`
                    <div class="col-md-3 rounded-2">
                        <div class="position-relative overflow-hidden hov" onclick="showByName(`+i+`)">
                            <img src=${apiDataS.meals[i].strMealThumb} class="img-fluid rounded-2">
                            <div class="layer d-flex align-items-center flex-wrap rounded-2 p-2">
                                <h2>${apiDataS.meals[i].strMeal}</h2>
                            </div>
                        </div>
                    </div>
                `
    }
    document.querySelector("#search .row2").innerHTML=cartona;
    
}
let response3;
function showByName(index5){
    let serName = apiDataS.meals[index5].strMeal;

    async function getSearchDetailsByName(){
        $(".loadingDiv").fadeIn(300);
        let nameApi= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${serName}`);
        response3= await nameApi.json();
        displayNameDetails();
        $(".loadingDiv").fadeOut(300);
    }
    getSearchDetailsByName();
}
function displayNameDetails(){
    document.querySelector("#search .row").innerHTML="";
    document.querySelector("#search .row2").innerHTML="";
    let fifth="";
    for(let i=0 ; i<response3.meals.length;i++)
    {
        fifth+=`
        <div class="col-lg-4">
        <div class="rounded-2">
            <img src=${response3.meals[i].strMealThumb} class="img-fluid rounded-2" >
            <h2 class="text-white">${response3.meals[i].strMeal}</h2>
        </div>
    </div>
    <div class="col-lg-8">
        <div class="text-white">
            <h1>Instructions</h1>
            <p>${response3.meals[i].strInstructions}</p>
                <h3>Area : ${response3.meals[i].strArea}</h3>
                <h3>Category : ${response3.meals[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="d-flex flex-wrap rounded-2" style="list-style-type: none;">
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response3.meals[i].strMeasure1} ${response3.meals[i].strIngredient1}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response3.meals[i].strMeasure2} ${response3.meals[i].strIngredient2}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response3.meals[i].strMeasure3} ${response3.meals[i].strIngredient3}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response3.meals[i].strMeasure4} ${response3.meals[i].strIngredient4}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response3.meals[i].strMeasure5} ${response3.meals[i].strIngredient5}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response3.meals[i].strMeasure6} ${response3.meals[i].strIngredient6}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response3.meals[i].strMeasure7} ${response3.meals[i].strIngredient7}</li>
                </ul>
                <h3>tages :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-danger m-2 p-1">${response3.meals[i].strTags}</li>
                </ul>
                <a href="${response3.meals[i].strSource}" target="_blank"><button class="btn btn-success">Source </button></a>
                <a href="${response3.meals[i].strYoutube}" target="_blank"><button class="btn btn-danger">YouTube </button></a>
        </div>
    </div>
        `
    }
    document.querySelector("#search .row9").innerHTML=fifth;

    $("#Search").click(function(){
        document.querySelector("#search .row2").innerHTML="";
        document.querySelector("#search .row9").innerHTML="";
        document.querySelector("#search .row").innerHTML=`  <div class="col-md-6">
                                                                <input type="text" class="form-control" id="name" placeholder="Search By Name">
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" class="form-control" id="letter" placeholder="Search By Letter" maxlength="1">
                                                            </div>`;
        
    })
}
/*search by letter */
let apil;
let apiDatal;
async function getMealByLetter(letter){
    apil = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    apiDatal= await apil.json();
    displaySearchL();
}
// setTimeout(() => {
    $("#letter").keyup(function () { 
        let input=$("#letter").val();
        getMealByLetter(input);
    });
// }, 1000);
function displaySearchL(){
    let ma5zan="";
    for(let i=0;i<apiDatal.meals.length;i++)
    {
        ma5zan+=`
                    <div class="col-md-3 rounded-2">
                        <div class="position-relative overflow-hidden hov" onclick="show(`+i+`)">
                            <img src="${apiDatal.meals[i].strMealThumb}" class="img-fluid rounded-2">
                            <div class="layer d-flex align-items-center flex-wrap rounded-2 p-2">
                                <h2>${apiDatal.meals[i].strMeal}</h2>
                            </div>
                        </div>
                    </div>
                `
    }
    document.querySelector("#search .row2").innerHTML=ma5zan;
    
}
let response5;
function show(index6){
    let serLetter = apiDatal.meals[index6].idMeal;

    async function getSearchDetailsByLetter(){
        $(".loadingDiv").fadeIn(300);
        let LetterApi= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${serLetter}`);
        response5= await LetterApi.json();
        displayLetterDetails();
        $(".loadingDiv").fadeOut(300);
    }
    getSearchDetailsByLetter();
}
function displayLetterDetails(){
    document.querySelector("#search .row").innerHTML="";
    document.querySelector("#search .row2").innerHTML="";
    let six="";
    for(let i=0 ; i<response5.meals.length;i++)
    {
        six+=`
        <div class="col-lg-4">
        <div class="rounded-2">
            <img src=${response5.meals[i].strMealThumb} class="img-fluid rounded-2" >
            <h2 class="text-white">${response5.meals[i].strMeal}</h2>
        </div>
    </div>
    <div class="col-lg-8">
        <div class="text-white">
            <h1>Instructions</h1>
            <p>${response5.meals[i].strInstructions}</p>
                <h3>Area : ${response5.meals[i].strArea}</h3>
                <h3>Category : ${response5.meals[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="d-flex flex-wrap rounded-2" style="list-style-type: none;">
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response5.meals[i].strMeasure1} ${response5.meals[i].strIngredient1}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response5.meals[i].strMeasure2} ${response5.meals[i].strIngredient2}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response5.meals[i].strMeasure3} ${response5.meals[i].strIngredient3}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response5.meals[i].strMeasure4} ${response5.meals[i].strIngredient4}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response5.meals[i].strMeasure5} ${response5.meals[i].strIngredient5}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response5.meals[i].strMeasure6} ${response5.meals[i].strIngredient6}</li>
                    <li class="p-1 m-2 rounded-2"style="background-color: #CFF4FC; color: #055174;">${response5.meals[i].strMeasure7} ${response5.meals[i].strIngredient7}</li>
                </ul>
                <h3>tages :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-danger m-2 p-1">${response5.meals[i].strTags}</li>
                </ul>
                <a href="${response5.meals[i].strSource}" target="_blank"><button class="btn btn-success">Source </button></a>
                <a href="${response5.meals[i].strYoutube}" target="_blank"><button class="btn btn-danger">YouTube </button></a>
        </div>
    </div>
        `
    }
    document.querySelector("#search .row9").innerHTML=six;

    $("#Search").click(function(){
        document.querySelector("#search .row2").innerHTML="";
        document.querySelector("#search .row9").innerHTML="";
        document.querySelector("#search .row").innerHTML=`  <div class="col-md-6">
                                                                <input type="text" class="form-control" id="name" placeholder="Search By Name">
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" class="form-control" id="letter" placeholder="Search By Letter" maxlength="1">
                                                            </div>`;
        
    })
}
// /*------------------------------------categories------------------------------------------ */
let catApi;
let catData;

async function getCat(){
    $(".loadingDiv").fadeIn(300);
    catApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    catData = await catApi.json();
    displayCat();
    $(".loadingDiv").fadeOut(300);
}
let carton
function displayCat(){
    document.querySelector(".global .row1").innerHTML="";
    carton="";
    for(let i=0;i<catData.categories.length;i++)
    {
        carton+=`
                <div class="col-md-3">
                    <div class=" rounded-2 position-relative hov overflow-hidden" onclick="getCatDetails(`+i+`)">
                        <img src=${catData.categories[i].strCategoryThumb} class="img-fluid rounded-2">
                        <div class="layer position-absolute text-center ">
                            <h3 class="pt-1">${catData.categories[i].strCategory}</h3>
                            <p style="letter-spacing:-1px;">${catData.categories[i].strCategoryDescription.split(" ").slice(0,100).join(" ")}</p>
                        </div>
                    </div>
                </div>
                `
    }
    
    document.querySelector(".global .row5").innerHTML=carton;
    
}

$("#Categories").click(function(){
    // $("#home,#search,#area,#ingredients,#contact").css("display","none");
    // $("#categories").css("display","block");
    getCat();
    $(".sidebar").animate({left:`-${ulWidth}`} ,500);
    $(".iii").removeClass("fa-xmark");
    $(".iii").addClass("fa-bars");
})

// get cat details
let filterCatData;
function getCatDetails(index2){
    let catName = catData.categories[index2].strCategory;

    async function filterCat(){
        $(".loadingDiv").fadeIn(300);
        let filterCatApi= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
        filterCatData= await filterCatApi.json();
        displayFilterCat();
        $(".loadingDiv").fadeOut(300);
    }
    filterCat();
}
function displayFilterCat(){
    document.querySelector(".global .row1").innerHTML="";
    document.querySelector(".global .row55").innerHTML="";
    document.querySelector(".global .row5").innerHTML="";
    let car="";
    for(let i=0 ; i<filterCatData.meals.length;i++)
    {
        car+=`
                <div class="col-md-3 rounded-2">
                    <div class="position-relative overflow-hidden hov"  onclick="getDet(`+i+`)">
                        <img src=${filterCatData.meals[i].strMealThumb} class="img-fluid rounded-2">
                        <div class="layer d-flex align-items-center flex-wrap rounded-2 p-2">
                            <h2>${filterCatData.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        `
    }
    document.querySelector(".global .row5").innerHTML=car;

        $("#Categories").click(function(){
            document.querySelector(".global .row5").innerHTML="";
            document.querySelector(".global .row1").innerHTML=carton;
            document.querySelector(".global .row55").innerHTML="";
        })

}

//details one cat
function getDet(inde){
    let getIdCat=filterCatData.meals[inde].idMeal;
    async function detCat(){
        $(".loadingDiv").fadeIn(300);
        let apiIdCat= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getIdCat}`)
        apiIdData= await apiIdCat.json();
        displayDetailsById();
        $(".loadingDiv").fadeOut(300);
    }
    detCat();
}
/*-------------------------------------------area---------------------------------------- */
let area;
let areaData;
//get area
$("#Area").click(function(){
    getArea();
    $(".sidebar").animate({left:`-${ulWidth}`} ,500);
    $(".iii").removeClass("fa-xmark");
    $(".iii").addClass("fa-bars");

})

async function getArea(){
    $(".loadingDiv").fadeIn(300);
    area=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    areaData= await area.json();
    displayArea();
    $(".loadingDiv").fadeOut(300);
}

let hsala;
function displayArea(){
    document.querySelector(".global .row1").innerHTML="";
    document.querySelector(".global .row5").innerHTML="";
    document.querySelector(".global .row55").innerHTML="";
    hsala="";
    for(let i=0;i<areaData.meals.length;i++)
    {
        hsala+=`
                <div class="col-md-3" onclick="getAreaDetails(`+i+`)">
                <div class="text-white text-center ii">
                    <i class="fa-solid fa-house-laptop fa-4x "></i>
                    <h2>${areaData.meals[i].strArea}</h2>
                </div>
            </div>
        `
    }
    document.querySelector(".global .row1").innerHTML=hsala;
}
//get area details
let filterAreaData;
function getAreaDetails(index1){
    let areaName = areaData.meals[index1].strArea;

    async function filterArea(){
        $(".loadingDiv").fadeIn(300);
        let filterAreaApi= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
        filterAreaData= await filterAreaApi.json();
        displayFilterArea();
        $(".loadingDiv").fadeOut(300);
    }
    filterArea();

}

function displayFilterArea(){
    document.querySelector(".global .row1").innerHTML="";
    document.querySelector(".global .row5").innerHTML="";
    document.querySelector(".global .row55").innerHTML="";
    let cart="";
    for(let i=0 ; i<filterAreaData.meals.length;i++)
    {
        cart+=`
                <div class="col-md-3 rounded-2">
                    <div class="position-relative overflow-hidden hov" onclick="showArea(`+i+`)">
                        <img src=${filterAreaData.meals[i].strMealThumb} class="img-fluid rounded-2">
                        <div class="layer d-flex align-items-center flex-wrap rounded-2 p-2">
                            <h2>${filterAreaData.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        `
    }
    document.querySelector(".global .row1").innerHTML=cart;

        $("#Area").click(function(){
            document.querySelector(".global .row55").innerHTML="";
            document.querySelector(".global .row1").innerHTML=hsala;
            document.querySelector(".global .row5").innerHTML="";
        })
}
// show one meal details

function showArea(index3){
    let areaId=filterAreaData.meals[index3].idMeal;
    async function showArea1(){
        $(".loadingDiv").fadeIn(300);
        let apiIdArea= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${areaId}`)
        apiIdData= await apiIdArea.json();
        displayDetailsById();
        
    $(".loadingDiv").fadeOut(300);
    }
    showArea1();

}

/*----------------------------------------Ingredients---------------------------------------------------- */
let apiIng;
let ingData;
//get ingrediant
$("#Ingredients").click(function(){
    getIngredients();
    $(".sidebar").animate({left:`-${ulWidth}`} ,500);
    $(".iii").removeClass("fa-xmark");
    $(".iii").addClass("fa-bars");
})
async function getIngredients(){
    $(".loadingDiv").fadeIn(300);
    apiIng= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    ingData=await apiIng.json();
    displayIng()
    
    $(".loadingDiv").fadeOut(300);
}
//get details ingrediant
let s;
function displayIng(){
    document.querySelector(".global .row1").innerHTML=s;
    document.querySelector(".global .row5").innerHTML=s;
    document.querySelector(".global .row55").innerHTML=s;
    s="";
    for(let i=0;i<20;i++)
    {
        s+=`
            <div class="col-md-3">
                <div class="text-white text-center ing" onclick="getIngDetails(`+i+`)">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h2>${ingData.meals[i].strIngredient}</h2>
                    <p>${ingData.meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
        `
    }
    document.querySelector(".global .row1").innerHTML=s;
}
let filterIngData;
function getIngDetails(index){
    let ingName = ingData.meals[index].strIngredient;
    async function filterIng(){
        $(".loadingDiv").fadeIn(300);
        let filterIngApi= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`);
        filterIngData= await filterIngApi.json();
        displayFilterIng();
    $(".loadingDiv").fadeOut(300);
    }
    filterIng();
}
function displayFilterIng(){

    document.querySelector(".global .row1").innerHTML="";
    document.querySelector(".global .row5").innerHTML="";
    document.querySelector(".global .row55").innerHTML="";
    let carto="";
    for(let i=0 ; i<filterIngData.meals.length;i++)
    {
        carto+=`
                <div class="col-md-3 rounded-2">
                    <div class="position-relative overflow-hidden hov" onclick="showIng(`+i+`)">
                        <img src=${filterIngData.meals[i].strMealThumb} class="img-fluid rounded-2">
                        <div class="layer d-flex align-items-center flex-wrap rounded-2 p-2">
                            <h2>${filterIngData.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        `
    }
    document.querySelector(".global .row1").innerHTML=carto;

        $("#Ingredients").click(function(){
            document.querySelector(".global .row1").innerHTML="";
            document.querySelector("#ingredients .row5").innerHTML=s;
            document.querySelector(".global .row55").innerHTML="";
        })

}

//show one ingrediant
function showIng(index4){ 
    let ingId=filterIngData.meals[index4].idMeal;
    async function showIng1(){
        $(".loadingDiv").fadeIn(300);
        let apiIdIng= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingId}`)
        apiIdData= await apiIdIng.json();
        displayDetailsById();
        
    $(".loadingDiv").fadeOut(300);
    }
    showIng1()
}
/*------------------------------------------------contact us-------------------------------------------------------------- */

$("#Contact").click(function(){
    $("#search,.global").css("display","none");
    $("#contact").css("display","flex");
    $(".sidebar").animate({left:`-${ulWidth}`} ,500);
    $(".iii").removeClass("fa-xmark");
    $(".iii").addClass("fa-bars");
})

/*----------------validation---------------*/
let regexName=/^[a-z A-Z]{1,}$/;
let regexEmail=/^[a-zA-Z]\w+@[a-zA-Z]{3,15}\.[a-z]{2,5}/;
let regexTele=/^(01)[0125][0-9]{8}/;
let regexAge=/^[0-9]{1,2}$/;
let regexPass=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

let nameInput= document.getElementById("name2");
let emailInput=document.getElementById("email");
let phoneInput=document.getElementById("phone");
let ageInput=document.getElementById("age");
let passInput=document.getElementById("pass");
let repassInput=document.getElementById("repass");

let parName=document.getElementById("pname");
let parEmail=document.getElementById("pemail");
let parPhone=document.getElementById("pphone");
let parAge=document.getElementById("page");
let parPass=document.getElementById("ppass");
let parRepass=document.getElementById("prepass");

let nameTouch=false;
let emailTouch=false;
let phoneTouch=false;
let ageTouch=false;
let passTouch=false;
let repassTouch=false;

function validationName(){
    return(regexName.test(nameInput.value));
}
function validationEmail(){
    return(regexEmail.test(emailInput.value));
}
function validationTele(){
    return(regexTele.test(phoneInput.value));
}
function validationAge(){
    return(regexAge.test(ageInput.value));
}
function validationPass(){
    return(regexPass.test(passInput.value));
}
function validationRepass(){
    if(repassInput.value == passInput.value){
        return true
    }else{
        return false
    }
}

nameInput.addEventListener("focus",function(){
    nameTouch=true;
})
$(emailInput).focus(function () { 
    emailTouch=true;
});
$(phoneInput).focus(function () { 
    phoneTouch=true;
});
$(ageInput).focus(function () { 
    ageTouch=true;
});
$(passInput).focus(function () { 
    passTouch=true;
});
$(repassInput).focus(function () { 
    repassTouch=true;
});

function validation(){
    if(nameTouch)
    {
        if(validationName())
        {
            parName.classList.replace("d-block","d-none")
            
            
        }
        else
        {
            parName.classList.replace("d-none","d-block")
            
        }
    }
    
    if(emailTouch)
    {
        if(validationEmail())
        {
            parEmail.classList.replace("d-block","d-none")
        }
        else
        {
            parEmail.classList.replace("d-none","d-block")
        }
    }
    if(phoneTouch)
    {
        if(validationTele())
        {
            parPhone.classList.replace("d-block","d-none")
        }
        else
        {
            parPhone.classList.replace("d-none","d-block")
        }
    }
    if(ageTouch)
    {
        if(validationAge())
        {
            parAge.classList.replace("d-block","d-none")
        }
        else
        {
            parAge.classList.replace("d-none","d-block")
        }
    }
    if(passTouch)
    {
        if(validationPass())
        {
            parPass.classList.replace("d-block","d-none")
        }
        else
        {
            parPass.classList.replace("d-none","d-block")
        }
    }
    if(repassTouch)
    {
        if(validationRepass())
        {
            parRepass.classList.replace("d-block","d-none")
        }
        else
        {
            parRepass.classList.replace("d-none","d-block")
        }
    }
    if(validationName() && validationEmail() && validationTele() && validationAge() && validationPass() && validationRepass())
    {
        document.getElementById("sub").removeAttribute("disabled");
        // document.getElementById("sub").classList.add("btn-danger");
        
    }else{
        document.getElementById("sub").setAttribute("disabled" , "true")
    }
}
$("#contact input").keyup(function(){
    validation();
})