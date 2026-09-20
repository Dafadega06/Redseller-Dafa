/* =========================================
   DAFA NIAT BAIK
   REDSELLER PRICING TOOL
========================================= */


/* =========================================
   DEFAULT DISCOUNT
========================================= */

let discount = 28;


/* =========================================
   AMBIL ELEMENT HTML
========================================= */

const hargaHotelInput =
    document.getElementById("hargaHotel");


const feeInput =
    document.getElementById("fee");


const hargaCustomer =
    document.getElementById("hargaCustomer");


const detailHarga =
    document.getElementById("detailHarga");


const detailPotongan =
    document.getElementById("detailPotongan");


const detailFee =
    document.getElementById("detailFee");


const detailPersen =
    document.getElementById("detailPersen");


const discountButtons =
    document.querySelectorAll(".discount-btn");


const copyBtn =
    document.getElementById("copyBtn");


const resetBtn =
    document.getElementById("resetBtn");


const toast =
    document.getElementById("toast");


/* =========================================
   FORMAT RUPIAH

   250000
   ↓
   Rp 250.000
========================================= */

function formatRupiah(angka) {

    angka =
        Math.round(
            Number(angka) || 0
        );


    return (
        "Rp " +
        angka.toLocaleString("id-ID")
    );

}


/* =========================================
   AMBIL ANGKA DARI INPUT

   "250.000"
   ↓
   250000
========================================= */

function getNumber(value) {

    return (
        Number(
            String(value)
                .replace(/\D/g, "")
        ) || 0
    );

}


/* =========================================
   FORMAT INPUT

   250000
   ↓
   250.000
========================================= */

function formatInput(input) {

    const angka =
        getNumber(input.value);


    if (angka === 0) {

        input.value = "";

        return 0;

    }


    input.value =
        angka.toLocaleString("id-ID");


    return angka;

}


/* =========================================
   HITUNG HARGA
========================================= */

function hitung() {


    /* Ambil harga hotel */

    const harga =
        getNumber(
            hargaHotelInput.value
        );


    /* Ambil fee */

    const fee =
        getNumber(
            feeInput.value
        );


    /* Hitung potongan */

    const potongan =
        harga *
        discount /
        100;


    /*
       RUMUS:

       Harga Customer
       =
       Harga Hotel
       - Potongan
       + Fee
    */

    const total =
        harga -
        potongan +
        fee;



    /* =====================================
       HASIL UTAMA
    ===================================== */

    hargaCustomer.textContent =
        formatRupiah(total);



    /* =====================================
       DETAIL HARGA HOTEL
    ===================================== */

    detailHarga.textContent =
        formatRupiah(harga);



    /* =====================================
       DETAIL POTONGAN
    ===================================== */

    detailPotongan.textContent =
        "- " +
        formatRupiah(potongan);



    /* =====================================
       DETAIL FEE
    ===================================== */

    detailFee.textContent =
        "+ " +
        formatRupiah(fee);



    /* =====================================
       DETAIL PERSENTASE
    ===================================== */

    detailPersen.textContent =
        discount + "%";

}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        1800
    );

}


/* =========================================
   INPUT HARGA HOTEL
========================================= */

hargaHotelInput.addEventListener(
    "input",
    function () {

        formatInput(this);

        hitung();

    }
);


/* =========================================
   INPUT FEE
========================================= */

feeInput.addEventListener(
    "input",
    function () {

        formatInput(this);

        hitung();

    }
);


/* =========================================
   PILIH DISCOUNT
========================================= */

discountButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                /* Ambil discount */

                discount =
                    Number(
                        this.dataset.discount
                    );


                /* Hapus active */

                discountButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                /* Aktifkan tombol */

                this.classList.add(
                    "active"
                );


                /* Hitung ulang */

                hitung();

            }
        );

    }
);


/* =========================================
   COPY HARGA CUSTOMER
========================================= */

copyBtn.addEventListener(
    "click",
    async function () {


        /*
            Yang disalin:

            Rp 154.000
        */

        const harga =
            hargaCustomer.textContent;


        try {

            await navigator.clipboard.writeText(
                harga
            );

        }

        catch (error) {

            /*
                Backup untuk browser
                yang tidak mengizinkan
                Clipboard API
            */

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                harga;


            textarea.style.position =
                "fixed";


            textarea.style.opacity =
                "0";


            document.body.appendChild(
                textarea
            );


            textarea.select();


            document.execCommand(
                "copy"
            );


            textarea.remove();

        }


        /* Simpan tulisan tombol */

        const tulisanAwal =
            copyBtn.innerHTML;


        /* Ubah tombol */

        copyBtn.textContent =
            "✓ Harga berhasil disalin";


        /* Tampilkan toast */

        showToast(
            harga +
            " sudah disalin"
        );


        /* Kembalikan tombol */

        setTimeout(
            function () {

                copyBtn.innerHTML =
                    tulisanAwal;

            },
            1600
        );

    }
);


/* =========================================
   RESET
========================================= */

resetBtn.addEventListener(
    "click",
    function () {


        /* Kosongkan input */

        hargaHotelInput.value =
            "";


        feeInput.value =
            "";


        /* Kembali ke 28% */

        discount = 28;


        /* Reset tombol */

        discountButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        discountButtons[0]
            .classList.add(
                "active"
            );


        /* Hitung ulang */

        hitung();

    }
);


/* =========================================
   HITUNG SAAT WEBSITE DIBUKA
========================================= */

hitung();