document.addEventListener("DOMContentLoaded", () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const thumbnailsContainer = document.getElementById("thumbnails");
  
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    const closeBtn = document.querySelector(".close");
    const modalPrev = document.querySelector(".modal-prev");
    const modalNext = document.querySelector(".modal-next");
  
    // Criar miniaturas
    slides.forEach((slide, index) => {
      const thumb = document.createElement("div");
      thumb.classList.add("thumbnail");
      if (index === 0) thumb.classList.add("active-thumb");
  
      const img = slide.querySelector("img");
      const video = slide.querySelector("video");
      let thumbContent;
  
      if (img) {
        thumbContent = img.cloneNode();
      } else if (video) {
        // Usa thumbnail personalizada com o mesmo nome do vídeo (ex: video.mp4 → video.jpg)
        thumbContent = document.createElement("img");
        const source = video.querySelector("source");
        if (source) {
          const videoSrc = source.getAttribute("src");
          const thumbSrc = videoSrc.replace(/\.\w+$/, ".jpg"); // muda extensão
          thumbContent.src = thumbSrc;
          thumbContent.alt = "Miniatura do vídeo";
        } else {
          // fallback se não tiver <source>
          thumbContent.src = "https://via.placeholder.com/120x75?text=Vídeo";
        }
      }
  
      if (thumbContent) {
        thumb.appendChild(thumbContent);
      }
  
      thumb.addEventListener("click", () => {
        currentSlide = index;
        showSlide(index);
        if (img) {
          updateModal(currentSlide);
          openModal();
        }
      });
  
      thumbnailsContainer.appendChild(thumb);
    });
  
    const thumbs = document.querySelectorAll(".thumbnail");
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active", "fade-in");
        if (i === index) {
          slide.classList.add("active", "fade-in");
  
          const video = slide.querySelector("video");
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
  
      thumbs.forEach((thumb, i) => {
        thumb.classList.remove("active-thumb");
        if (i === index) thumb.classList.add("active-thumb");
      });
    }
  
    function updateModal(index) {
      const slide = slides[index];
      const img = slide.querySelector("img");
      const caption = slide.querySelector(".caption").innerText;
  
      if (img) {
        modalImg.src = img.src;
        modalImg.style.display = "block";
      } else {
        modalImg.style.display = "none";
      }
  
      modalCaption.innerText = caption;
    }
  
    function openModal() {
      modal.classList.add("show-modal");
      modal.style.display = "block";
    }
  
    function closeModal() {
      modal.classList.remove("show-modal");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  
    document.getElementById("prevBtn").addEventListener("click", prevSlide);
    document.getElementById("nextBtn").addEventListener("click", nextSlide);
  
    // Clique na imagem para abrir modal
    slides.forEach((slide, i) => {
      const img = slide.querySelector("img");
      if (img) {
        img.addEventListener("click", () => {
          currentSlide = i;
          updateModal(currentSlide);
          openModal();
        });
      }
    });
  
    closeBtn.addEventListener("click", closeModal);
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  
    modalPrev.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
      updateModal(currentSlide);
    });
  
    modalNext.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      updateModal(currentSlide);
    });
  
    // Iniciar com o primeiro slide visível
    showSlide(currentSlide);
  });
  