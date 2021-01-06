import * as React from 'react';
import styles from './GeneralNews.module.scss';
import { IGeneralNewsProps } from './IGeneralNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jQuery from "jquery";
import { ClassNews } from './ClassNews';
import { INews } from './INews';
import { Web } from "sp-pnp-js";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/sites";
//import pnp from 'sp-pnp-js';
import { Item } from '@pnp/sp/items';



export default class GeneralNews extends React.Component<IGeneralNewsProps, any> {
  public constructor(props: IGeneralNewsProps, any) {

    super(props);
    this.state = {
      //items: []
      items:new Array<any>()
    };
//    this.getListItems();
this._NewsList();

  }


//   private getListItems(): void {
//     if (typeof this.props.sitePages !== "undefined" && this.props.sitePages.length > 0)
//      {
//       sp.web.lists.getByTitle(this.props.sitePages).items.filter("Title ne ('Home')").select("Title","Description","Created","Link","BannerImageUrl").get().then
//         ((results: Array<any>) => {
//           this.setState({
//             items: results
//           });
//         })
//         .catch((error: any) => {
//           console.log("Failed to get list items!");
//           console.log(error);
//         });

//         //       let NewsCollection=response.map(item=> new ClassNews(item)).reverse();
// //       let NewsCard = NewsCollection.slice(0, 6)
// //       this.setState({items:NewsCard});

//     }
//   }




  // public componentDidUpdate(prevProps: IGeneralNewsProps): void {
  //   if (prevProps.sitePages !== this.props.sitePages) {
  //     this.getListItems();
  //   }
  // }







  public render(): React.ReactElement<IGeneralNewsProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
      <div className={styles.News}>
        <div className={styles.headline}>
          <div className={styles.grid}>
            <div className={styles.hcard}>
              <h1>Departmental News</h1>
            </div>
            <div className={styles.hcard}>
              <a href="https://axamansard.sharepoint.com/SitePages/Newsfeed.aspx">View All</a>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {
            this.state.items.map((Item: INews) => {
              return (
                <div className={styles.card}>
                  <div className={styles.grids}>
                    <div className={styles.cards}>
                      <img src={Item.BannerImageUrl['Url']} alt="Departmental News" />
                    </div>
                    <div className={styles.cards}>
                      <h3 className={styles.title}>{Item.Title}</h3>
                      <p>{Item.Description}</p>
                      <a>{Item.Created}</a> <br /><br />
                      <a href={Item.Link} className={styles.btn}>Read More</a>
                    </div>
                  </div>
                </div>
              );


            })

          }
        </div>
      </div>
    );
  }
   public componentDidMount()
  {

  debugger;
   this._NewsList();
  }
  private _NewsList():void
  {


let web = new Web(this.props.context.pageContext.web.absoluteUrl);  


  web.lists.getByTitle("Site Pages").items.filter("Title ne ('Home')").select("Title","Description","Created","Link","BannerImageUrl").get().then
    ((response)=>{    
    console.log(response);
      let NewsCollection=response.map(item=> new ClassNews(item)).reverse();
      let NewsCard = NewsCollection.slice(0, 6);
      this.setState({items:NewsCard});
  }

  );
   }
}
