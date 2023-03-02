let addtoListDOM = document.querySelector("#liveToastBtn");

let liDOM = document.querySelector("#task");

let arrayList = [];

const liste = document.querySelector("#list");

update();



function update() {
  addLocalList(); 

  arrayList.forEach(function (stay) {
    newLiDOM(stay); //İÇİNDE İSE ARRAY'DEKİ ELEMANI/ELEMANLARI TEKRAR LİSTEYE EKLEME FONKSİYONUNA GÖTÜR //
  });
}

//İMPUTTA GİRİLEN DEĞERİ ALMA VE TOAST EKLEME//
function createDeleteButton(){
    var img= new Image();
    img.src = "cross.jpg"
    img.width = 20;
    img.style = "float:right";
    img.addEventListener('click', function(){ //butonun click eventi olsun, tıklandığında parent elementini silsin
        var deletedListElement = this.parentElement;
        deletedListElement.remove();
    })
    return img;
}



function newElement() {
  const valueLi = liDOM.value.trim(); //liDOM.value inputa girilen girdi(#task) trim() yaparak space tuşuna basınca kabul etmiyor//

  if (valueLi == "") {
    //birşey yazılmadan direk eklemeye çalışmak demek//

    $(".error.toast").toast("show"); //BOOTSTRAP TOASTTA BİLGİSİ VAR//
  } else {
    newLiDOM(valueLi); //imputtaki valuemizi listeye eleman olarak ekleme fonksiyonu//

    liDOM.value = ""; //button a bastıktan sonra imput girdisini temizler//
    liDOM.appendChild(createDeleteButton())
    $(".success.toast").toast("show");

    newTask(valueLi); //local storage e elemanı ekleme fonksiyonu//
  }

  e.preventDefault();
}

//İMPUTTAKİ VALUEMİZİ LİSTEYE OLARAK EKLEMEK FONKSİYONU//

function newLiDOM(listElement) {
  const newLi = ` <li class="listem">${listElement}<i class="fa fa-times close"></i></li>`; //CLOSE CLASSINI HTML KISMINDA EKLEDİM VE ÜSTÜ ÇİZİLMESİN DİYE CSS DOSYASINDA CLOSe CLASINA text-decoration: none; ekledim//

  liste.innerHTML += newLi;
}

//CLOSE CLASINI ÇALIŞTIRARAK ELEMAN SİLME VE CHECKED CLASSINI TOGGLE EDEREK KELİMELERİN ÜSTÜNÜ ÇİZME//

liste.addEventListener("click", (e) => {
  //liste(#list)

  if (e.target.classList.contains("close")) {
    const parentContains = e.target.parentElement; //ul da li ye parentContains dedim//

    parentContains.remove();

    const deleted = parentContains.firstChild.textContent; //LOCALDEN SİLME FONKSİYONU// //ebeveynimizin metin elemanıı olan çocuğu aslında liDOM.value.trim() demiş oluyorum//

    deletedLocalStored(deleted);
  }

  if (e.target.classList.contains("listem")) {
    //LİSTEM CLASSI HTML DE Lİ YE EKLEDİĞİM BİR CLASS//

    e.target.classList.toggle("checked"); //VARSA TERSİNE ÇEVİR YOKSA ÇALIŞTIR DEMEK//
  } //E.TARGET.CLASSLİST SEÇTİĞİM CLASSTA ANLAMINDA; BU CLASSIN ELEMANLARINA TIKLADIĞIMDA ÇALIŞSIN, BU ŞEKİLDE ANLADIM//
});

//LOCAL STORAGE  OLUŞTURDUĞUM ARRAY'E(LİSTEDİZİSİ) valueLi(LİSTEİNPUTU.VALUE.TRİM()) EKLEME//

function newTask(addedValue) {
  addLocalList();
  arrayList.push(addedValue);
  localStorage.setItem("localList", JSON.stringify(arrayList));
}

// LOCAL STORAGE, SİLİNEN VE EKLENEN ELEMANLARI KONTROL EDİP SAYFA YENİLENİNCE SİLİNMEYEN ELEMANLARI TEKRAR EKLE DER VE SAYFAYENİLENCEKALSIN YAPARIZ//

function addLocalList() {
  if (localStorage.getItem("localList") === null) {
    //SAYFA AÇILDIĞINDA LOCAL HİÇ KAYITLI ELEMAN YOK ANLAMINDA//
    arrayList = []; //SAYFAYA EKLENECEK ELEMAN YOK//
  } else {
    arrayList = JSON.parse(localStorage.getItem("localList")); //LOCALDE ELEMAN VAR , ARRAY'İNE EKLE VE SAYFAYENİLENCEKALSIN YAP//
  }
}

// LOCAL STORAGEDEN valueLi İ SİLMEK//

function deletedLocalStored(deletes) {
  addLocalList();
  arrayList.forEach(function (willDelete, index) {
    //DİZİDE İNDEXE GÖRE ELEMANLARA BAK//
    if (deletes === willDelete) {
      //İNDEXTEKİ valueLi SİLİNENLER'E  EŞİTSE//
      arrayList.splice(index, 1); //SİL//
    }
  });
  localStorage.setItem("localList", JSON.stringify(arrayList));
}

//LOCAL STORAGE İ PEK ANLAMADIM AMA PRATİK YAPTIKCA GELİŞİR//
