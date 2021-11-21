const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)

// ================================

const play = $(".main")
const cd = $(".cd")
const author= $(".heading")
const heading = $(".dashboard_header h4")
const cdthumb = $(".cd-thumb")
const audio = $("#audio")
const playbtn = $(".btn-toggle-play")
const progress   = $(".progress")
const nextBtn = $(".btn-next")
const prevBtn = $(".btn-prev")
const randomBtn = $(".btn-random")
const repeatBtn = $(".btn-repeat")
const playList = $(".playlist")
const PLAYER_STORANGE_KEY = "F8_PLAYER"
const app = {

  currentIndex : 0,
  isPlaying : false,
  isRandom : false,
  isRepeat : false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORANGE_KEY)) || {},
	songs: [
		{
			name: "Tìm lại bầu trời",
			siggle:"Tuấn Hưng",
			path: "./video/Tim-Lai-Bau-Troi-Tuan-Hung.mp3",
			img:"./img/tuanhung.jpg"
		},
    {
			name: "Vì một người ra đi",
			siggle:"Ưng hoàng phúc",
			path: "./video/Vi-Mot-Nguoi-Ra-Di-Ung-Hoang-Phuc.mp3",
			img:"./img/unghoangphuc.jpg"
		},
    {
			name: "Hãy xem là giấc mơ",
			siggle:"Chu Bin",
			path: "./video/Hay-Xem-La-Giac-Mo-Chu-Bin.mp3",
			img:"./img/chubin.jpg"
		},
    {
			name: "Vết thương trong tim",
			siggle:"Châu Khái phong",
			path: "./video/Vet-Thuong-Trong-Tim-Chau-Khai-Phong.mp3",
			img:"./img/khảiphong.jpg"
		},
		{
			name: "Con đường mưa",
			siggle:"Cao Thái Sơn",
			path: "./video/Con-Duong-Mua-Cao-Thai-Son.mp3",
			img:"./img/tieu-su-ca-si-cao-thai-son-393939.jpg"
		},
		{
			name: "Nếu lúc trước em đừng tới",
			siggle:"Quang Vinh",
			path: "./video/Neu-Luc-Truoc-Em-Dung-Toi-Quang-Vinh.mp3",
			img:"./img/quangvinh.jpg"
		},
		{
			name: "Ngỡ",
			siggle:"Quang Hà, Khắc Việt",
			path: "./video/Ngo-Quang-Ha-Khac-Viet.mp3",
			img:"./img/ca_si_quang_ha_dspl_1_QFRM.jpg"
		},
		{
			name: "Cha",
			siggle:"Quách Beem",
			path: "./video/CHA-Quach-Beem.mp3",
			img:"./img/quachbeem.jpg"
		},
    {
			name: "Trăm Năm Không Quên",
			siggle:"Quang Hà",
			path: "./video/Tram-Nam-Khong-Quen-Quang-Ha.mp3",
			img:"./img/ca_si_quang_ha_dspl_1_QFRM.jpg"
		},
    {
			name: "Thay Thế",
			siggle:"Hồ Gia Hùng",
			path: "./video/Thay-The-Ho-Gia-Hung.mp3",
			img:"./img/hogiahung.jpg"
		},
    {
			name: "Tình Anh Em",
			siggle:"Lâm Chấn Huy",
			path: "./video/Tinh-Anh-Em-Lam-Chan-Huy-Lam-Chan-Hai.mp3",
			img:"./img/lâm chấn huy.jpg"
		},
    {
			name: "Mẹ",
			siggle:"Quách Beem",
			path: "./video/Me-Quach-Beem.mp3",
			img:"./img/quachbeem.jpg"
		},
    ,
    {
			name: "Nối Lửa Lên - Nổi Vòng Tay Lớn",
			siggle:"Trường Sinh",
			path: "./video/Noi-Lua-Len-Noi-Vong-Tay-Lon-Truong-Sinh.mp3",
			img:"./img/trường sinh.jpg"
		},
    ,
    {
			name: "Tất Cả Là Hồng Ân",
			siggle:"Nguyễn Hồng Ân",
			path: "./video/Tat-Ca-La-Hong-An-Nguyen-Hong-An.mp3",
			img:"./img/nguyễn hồng ân.jpg"
		}
	],
  setConfig: function(key, value){
      this.config[key] = value
      localStorage.setItem(PLAYER_STORANGE_KEY, JSON.stringify(this.config))
  },
	render : function(){
		const htmls = this.songs.map((current, index)=>{
			return `
				<div class="song ${index === this.currentIndex ? "active" : " "}" data-index = ${index}>
				<div class="thumb" style = "background-image:url('${current.img}')"></div>
				
				<div class="body">
					<h4 class="title">${current.name}</h4>
					<p class="author">${current.siggle}</p>
				</div>
				<div class="option">
					<i class="fas fa-ellipsis-h"></i>
				</div>
			</div>
			`
		})
		playList.innerHTML = htmls.join("");
	},

  // định nghĩa thuộc tính
  defineProperties : function(){
      Object.defineProperty(this, "currentSong",{
        get : function(){
          return this.songs[this.currentIndex]
        }
      })

  },

	handleEvents : function(){
    var _this = this
		const cdWidth = cd.offsetWidth;

    // xử lý cd quay và dừng
    const cdthumbAnimate =  cdthumb.animate([
      {
        transform : "rotate(360deg)"
      }
    ],{
      duration: 10000, // 10s
      iterations : Infinity
    }) //  trả về một đối tượng
  cdthumbAnimate.pause();

    // xử lý phóng to / thu nhỏ CD
		document.onscroll = function(){
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const newCdWidth = cdWidth - scrollTop;

			cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
			cd.style.opacity = newCdWidth / cdWidth;
		}
    // xử lý khi play 
    playbtn.onclick = function(){

      if(_this.isPlaying){     
         audio.pause()
      }else{
          audio.play()
      }
    }

    // khi song được play
    audio.onplay = function(){
      _this.isPlaying = true
      play.classList.add("playing")
      cdthumbAnimate.play();
    }


    // khi song bị pause
    audio.onpause = function(){
      _this.isPlaying = false
      play.classList.remove("playing")
      cdthumbAnimate.pause();
      
    }

    // khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function(){
      if(audio.duration){
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
      }
    }

    //xử lý khi tua song
    progress.oninput = function(e){
      const seeKTime = audio.duration / 100 * e.target.value;
      audio.currentTime = seeKTime
    }

    // khi next song
    nextBtn.onclick = function(){
      if(_this.isRandom){
        _this.playRandomSong();
      }else{
        _this.nextSong();
      }
      audio.play();
      // render lại bài hát
      _this.render();

      _this.scrollToActiveSong();

    }

    // khi prev song
    prevBtn.onclick = function(){
      // khi bật nút random
      if(_this.isRandom){
        _this.playRandomSong();
      }else{
        _this.prevSong();
      }
      audio.play();
      // render lại bài hát
      _this.render();

      _this.scrollToActiveSong();
    }


    // khi random song 
    randomBtn.onclick = function(){
      // có thể xử lý như này
      //randomBtn.classList.toggle("active")
      _this.setConfig("isRandom", _this.isRandom)
       _this.isRandom = !_this.isRandom
       randomBtn.classList.toggle("active", _this.isRandom)
        
       
       repeatBtn.classList.remove("active")
       _this.isRepeat = false
      
    }

    // xử lý lặp lại một song 
        repeatBtn.onclick  = function(){
      _this.setConfig("isRepeat", _this.isRepeat)
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle("active", _this.isRepeat)
      
      randomBtn.classList.remove("active")
      _this.isRandom = false

    }
     // xử lý next song khi audio ended
     audio.onended = function(){
      if(_this.isRepeat){
        audio.play();
      }else if(_this.isRandom){
         nextBtn.click();
      }else{
        // xử lý khi người dùng không bật random hay repeat thì nó cũng sẽ tự chuyển bài
        nextBtn.click()
      }
    }

    // xử lý sự kiện click vào playList
    playList.onclick = function(e){
      var songNode = e.target.closest(".song:not(.active)")
        if(songNode || e.target.closest(".option")){
          
           // xử lý khi click vào song 
            if(songNode ){
              _this.currentIndex = Number(songNode.dataset.index)
              _this.loadCurrentSong();
              _this.render();
              audio.play();
            }
            
            // xử lý click vào option
            if(e.target.closest(".option")){
              // tùy mình 
            }
        }
    }

	},

  // phải sửa thêm
  scrollToActiveSong: function(){
    setTimeout(()=>{
        $('.song.active').scrollIntoView({
          behavior : 'smooth',
          block : 'nearest'
        });
    },300)
  },

  // load bài hát đầu tiên
  loadCurrentSong : function(){
    console.log(author.innerText = name)
      heading.innerText = this.currentSong.name
      author.innerText = this.currentSong.siggle
      cdthumb.style.backgroundImage = `url('${this.currentSong.img}')`
      audio.src = this.currentSong.path
  },

  // load config 
  loadConfig : function(){
      this.isRandom = this.config.isRandom
      this.isRepeat = this.config.isRepeat
  },

  // khi nextsong
  nextSong : function(){
    this.currentIndex++
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0
    }
    this.loadCurrentSong();

  },

  // khi prev song
  prevSong: function(){
    this.currentIndex--
    if(this.currentIndex < 0){
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong();
  },

  // khi random song 
  playRandomSong : function(){
    let newIndex;
      do{
          newIndex = Math.floor(Math.random() * this.songs.length)
      }while(newIndex === this.currentIndex)

      this.currentIndex = newIndex
      this.loadCurrentSong();
  },

	init: function(){
    // gán cấu hình từ config vào ứng dụng
    this.loadConfig();

    // định nghĩa thuộc tính cho object
    this.defineProperties();

    // xử lý các sự kiện (Dom event)
  
		this.handleEvents();

    // tải thông tin bài hát đầu tiên vào giao diện
    this.loadCurrentSong();

    // render playlist
		this.render();

    // hiển thị trạng thái ban đầu của nút button
    randomBtn.classList.toggle("active", this.isRandom)
	}
}

app.init()


