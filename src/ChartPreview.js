import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    chartPreviewHeaderContent: {
        width: '80%',
    },
    chartPreviewMedia : {
        height: 0, paddingTop: '56.25%'
    },
    iconButtonRoot: {
        'background-color':'gray'
    }
}));



function ChartPreview(props) {
    const classes = useStyles();
    return <Grid item xs={4}>
        <Card>
            <CardHeader
                classes={{
                    content: classes.chartPreviewHeaderContent,
                }}
                avatar={
                  <Avatar alt="USER_PFP_PLACEHOLDER" src={props.pfp}>
                  </Avatar>
                }
                /*
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                */
                title={props.chartDescription}
                titleTypographyProps={{'noWrap':true, 'color':'textPrimary'}}
            />
            <CardMedia
                className={classes.chartPreviewMedia}
                image={props.preview}
                title={props.chartDescription}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" color="primary" classes={{
                    root: classes.iconButtonRoot
                }}>
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" classes={{
                    root: classes.iconButtonRoot
                }}>
                  <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    </Grid>;
}

export default ChartPreview

/*  return <div>
    <div> <img src={props.pfp} alt={"Profile Picture"} width={32} height={32}/> {props.chartDescription} </div> 
    <img src={props.preview} alt={props.chartDescription} width={300} height={300}/>
    <div> TODO: Funktionstasten</div>
  </div>;*/