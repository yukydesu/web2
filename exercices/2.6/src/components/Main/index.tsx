import Cinema from "./Cinema";
import Movie from "./Movie";
import "./Main.css";

const Main = () => {

  return (
      <main className="main">
        <h1>Movie List</h1>
        <Cinema name="UGC DeBrouckère">

          <Movie
            title="HAIKYU-THE DUMPSTER BATTLE" 
            director="Susumu Mitsunaka"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            desription="The Dumpster Battle is the 4th episode of the 4th season of the Haikyuu!! series. It was aired on January 31, 2020. The Dumpster Battle is the 4th episode of the 4th season of the Haikyuu!! series. It was aired on January 31, 2020. The Dumpster Battle is the 4th episode of the 4th season of the Haikyuu!! series. It was aired on January 31, 2020."
            >
            <p>Duration: 2h 15min</p>
          </Movie>

          <Movie 
            title="GOODBYE JULIA" 
            director="Mohamed Kordofani"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            desription="Goodbye Julia is a 2021 drama film directed by Mohamed Kordofani. The film stars Mohamed Kordofani, Julia Kordofani, and Kordofani Kordofani. The film was released on 1 January 2021. The film was released on 1 January 2021. The film was released on 1 January 2021."
            >
            <p>Duration: 2h 15min</p>
          </Movie>

          <Movie 
            title="INCEPTION" 
            director="Christopher Nolan"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            desription="Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with Emma Thomas, his wife. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another person's idea into a target's subconscious. The ensemble cast includes Ken Watanabe, Joseph Gordon-Levitt, Marion Cotillard, Elliot Page, Tom Hardy, Dileep Rao, Cillian Murphy, Tom Berenger, and Michael Caine."
            >
            <p>Duration: 2h 28min</p>
          </Movie>

          <Movie 
            title="PARASITE" 
            director="Bong Joon-ho"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            desription="Parasite is a 2019 South Korean black comedy thriller film directed by Bong Joon-ho, who co-wrote the screenplay with Han Jin-won. It stars Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik, Park So-dam, Jang Hye-jin, and Lee Jung-eun and follows the members of a poor family who scheme to become employed by a wealthy household by infiltrating the household and posing as unrelated, highly qualified individuals."
            >
            <p>Duration: 2h 12min</p>
          </Movie>

        </Cinema>

        <Cinema name="UGC Toison d'Or">

          <Movie 
            title="THE WATCHERS" 
            director="Ishana Night Shyamalan"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            desription="The Watchers is a 2021 American psychological thriller film written and directed by Ishana Night Shyamalan. It stars Gael García Bernal, Vicky Krieps, Rufus Sewell, Ken Leung, Nikki Amuka-Bird, Abbey Lee, Aaron Pierre, Alex Wolff, Embeth Davidtz, Eliza Scanlen, Emun Elliott, Kathleen Chalfant, and Thomasin McKenzie. The film follows a vacationing family who discover that the secluded beach where they are relaxing for a few hours is somehow causing them to age rapidly, reducing their entire lives into a single day."
            >
            <p>Duration: 1h 45min</p>
          </Movie>

          <Movie 
            title="BAD" 
            director="Adil El Arbi, Bilall Fallah"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            desription="BAD is a 2021 Belgian action comedy film directed by Adil El Arbi and Bilall Fallah. The film stars Nabil Mallat, Gene Bervoets, and Jeroen Perceval. The film was released on 13 October 2021. The film was released on 13 October 2021. The film was released on 13 October 2021."
            >
            <p>Duration: 2h 4min</p>
          </Movie>

          <Movie 
            title="TENET" 
            director="Christopher Nolan"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            desription="TENET is a 2020 science fiction action-thriller film written and directed by Christopher Nolan, who produced it with Emma Thomas. A co-production between the United Kingdom and United States, it stars John David Washington, Robert Pattinson, Elizabeth Debicki, Dimple Kapadia, Michael Caine, and Kenneth Branagh. The film follows a secret agent who learns to manipulate the flow of time to prevent an attack from the future that threatens to annihil"
          >
            <p>Duration: 2h 30min</p>
          </Movie>

          <Movie 
            title="THE IRISHMAN" 
            director="Martin Scorsese"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            desription="The Irishman (titled onscreen as I Heard You Paint Houses) is a 2019 American epic crime film directed and produced by Martin Scorsese and written by Steven Zaillian, based on the 2004 nonfiction book I Heard You Paint Houses by Charles Brandt. It stars Robert De Niro, Al Pacino, and Joe Pesci, with Ray Romano, Bobby Cannavale, Anna Paquin, Stephen Graham, Stephanie Kurtzuba, Jesse Plemons, and Harvey Keitel in supporting roles. The film follows Frank Sheeran (De Niro), a truck driver who becomes a hitman and gets involved with mobster Russell Bufalino (Pesci) and his crime family, including his time working for the powerful Teamster Jimmy Hoffa (Pacino)."
          >
            <p>Duration: 3h 30min</p>
          </Movie>

        </Cinema>
        
      </main>
    );
  };

export default Main;