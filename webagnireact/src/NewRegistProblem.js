import React from 'react';
import TextField from 'material-ui/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Icon from 'material-ui/Icon';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ErrorIcon from '@material-ui/icons/Cancel';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import NotificationsOff from '@material-ui/icons/NotificationsOff';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import {withStyles} from "material-ui/styles/index";
import GoogleMapReact from 'google-map-react';
import {Link} from "react-router-dom";
import Table, { TableBody, TableCell, TablePagination, TableHead, TableRow } from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import UpdateListIcon from '@material-ui/icons/Save';
import Tooltip from 'material-ui/Tooltip';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const styles =  theme => ({
    title:{
        margin:20,
    },
    paper:theme.mixins.gutters({
        padding: 40,
        width: 500,
    }),
    textField: {
        margin: theme.spacing.unit,
        width: 350,
    },
    formControl: {
        margin: theme.spacing.unit,
        width: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    uploadButton: {
        margin: 20,
    },
    map:{
        marginBottom: 20,
    },
    properties:{
        display: 'inline-block',
    },
    regButton:{
        marginLeft: 1000,
    },
    searchButton:{
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    toolbarroot: {
        paddingRight: theme.spacing.unit,
    },
    toolbartitle: {
        flex: '0 0 auto',
    },
    spacer: {
        flex: '1 1 100%',
    },

});

let EnhancedTableToolbar = props => {
    const { classes } = props;

    return (
        <Toolbar
            className={classes.toolbarroot}
        >
            <div className={classes.toolbartitle}>
                {(
                    <Typography variant="title" id="tableTitle">
                        Registar Problema
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {(
                    <Tooltip title="Guardar">
                        <IconButton aria-label="Guardar">
                            <UpdateListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

EnhancedTableToolbar = withStyles(styles)(EnhancedTableToolbar);


class NewRegistProblem extends React.Component {

    constructor(){
        super();
        this.handleSeeIfLoggedIn = this.handleSeeIfLoggedIn.bind(this);
    }
    state = {
        name: 'Nome do Registo do Problema',
        description: '',
        private: false,
        visibility: "public",
        spaceType: "public",
        problemType: 'Limpeza de Mato',
        problem: 1,
        urgency: 3,
        location: '',
        open: false,
        privateSpace: false,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        console.log("spaceType: " + this.state.spaceType + " privateSpace: " + this.state.privateSpace);
    };

    handleMouseDownVisibility = event => {
        event.preventDefault();
    };

    handleVisibility = event => {
        if(event.target.value == 'private'){
            this.setState(
                {private: true}
            );
        }
        else{
            this.setState({private: false});
        }

        this.setState({ [event.target.name]: event.target.value });
    };

    handleTypeOfSpace = event => {
        if(event.target.value == 'private'){
            this.setState(
                {privateSpace: true}
            );
        }
        else{
            this.setState({privateSpace: false});
        }

        this.setState({ [event.target.name]: event.target.value });
        console.log("spaceType: " + this.state.spaceType + " privateSpace: " + this.state.privateSpace);
    };

    handleSpaceChange = event => {
        this.setState({ spaceType: event.target.value });
    };

    handleTypeChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        //this.setState({ problemType: event.target.toString()});
        //console.log("problemType: " + this.state.problemType);
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleRegistProblem = () => {
        var token = window.localStorage.getItem('token');
        var tokenjson = JSON.parse(token);

        var data = {
            "token": tokenjson,
            "title": this.state.name,
            "description": this.state.description,
            "type": this.state.problemType,
            "level": this.state.urgency,
            "visibility": !this.state.private,
            "lat": 38.661453,
            "lon": -9.206618,
            "notificationOnResolve": this.state.open,
        };

        console.log(data);

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "POST", 'https://custom-tine-204615.appspot.com/rest/occurrence/register');
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var myJSON = JSON.stringify(data);
        xmlHttp.send(myJSON);

        xmlHttp.onreadystatechange = function() {//Call a function when the state changes.
            if(xmlHttp.readyState === XMLHttpRequest.DONE) {

                if(xmlHttp.status === 200){
                    console.log("Sucesso");
                    document.getElementById("tothankyou").click();
                    //document.location.href = '/obrigada';
                }

                else{
                    console.log("Ocorreu um erro - Nao foi possivel registar o problema");
                    console.log("O token pode ter expirado");
                }
            }

        }
    };

    handleSeeIfLoggedIn = () => {
        console.log("here");
        var token = window.localStorage.getItem('token');

        if(token == null){
            console.log("null");
            //document.getElementById("tologin").click();
        }

    };

    static defaultProps = {
        center: {
            lat: 38.661453,
            lng: -9.206618
        },
        zoom: 11
    };

    render(){
        const { classes } = this.props;
        return(
            <div onLoad={this.handleSeeIfLoggedIn()}>
                <EnhancedTableToolbar></EnhancedTableToolbar>
                <Paper>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    id="name"
                                    label="Nome do registo"
                                    onChange={this.handleChange('name')}
                                    className={classes.textField}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <form onSubmit={this._handleSubmit}>
                                    <input type="file" onChange={this._handleImageChange} />
                                    {/*<button type="submit" onClick={this._handleSubmit}>Upload Image</button>*/}
                                </form>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div>
                                    <TextField
                                        id="location"
                                        label="Localizacao"
                                        onChange={this.handleChange('location')}
                                        className={classes.textField}
                                    />
                                    <Button variant="fab" mini className={classes.searchButton}> <SearchIcon/> </Button>
                                </div>

                                <div className={classes.map} style={{ height: '50vh', width: '100%' }}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: 'AIzaSyAM-jV8q7-FWs7RdP0G4cH938jWgQwlGVo' }}
                                        defaultCenter={this.props.center}
                                        defaultZoom={this.props.zoom}
                                    >
                                        <AnyReactComponent
                                            lat={38.661453}
                                            lng={-9.206618}
                                        />
                                    </GoogleMapReact>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    id="description"
                                    label="Descricao - descreva o estado generico do problema"
                                    multiline
                                    rows="4"
                                    onChange={this.handleChange('description')}
                                    className={classes.textField}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormControl
                                    component="fieldset"
                                    required
                                >
                                    <FormLabel component="legend">Tipo de espaco</FormLabel>
                                    <RadioGroup
                                        aria-label="typeSpace"
                                        name="typeSpace"
                                        value={this.state.spaceType}
                                        onChange={this.handleSpaceChange}
                                    >
                                        <FormControlLabel
                                            value="public"
                                            control={<Radio color="primary" />}
                                            label="Publico"
                                        />
                                        <FormControlLabel value="private" control={<Radio color="primary" />} label="Privado" />
                                    </RadioGroup>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="problem-name">Tipo de Problema</InputLabel>
                                    <Select
                                        value={this.state.problem}
                                        onChange = {this.handleTypeChange}
                                        inputProps={{
                                            name: 'problem',
                                            id: 'problem-name',
                                        }}
                                    >
                                        <MenuItem value={1}>Limpeza de Mato</MenuItem>
                                        <MenuItem value={2}>Zona de mau acesso</MenuItem>
                                        <MenuItem value={3}>Outro</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="urgency-level">Grau de urgencia:</InputLabel>
                                    <Select
                                        value={this.state.urgency}
                                        onChange = {this.handleTypeChange}
                                        inputProps={{
                                            name: 'urgency',
                                            id: 'urgency-level',
                                        }}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={this.state.visibility}
                                        onChange = {this.handleVisibility}
                                        displayEmpty
                                        name='visibility'
                                        className={classes.selectEmpty}
                                    >
                                        <MenuItem value="public">Toda a gente pode ver este problema</MenuItem>
                                        <MenuItem value="private">Apenas eu posso ver este problema</MenuItem>
                                    </Select>
                                    <FormHelperText>Visibilidade</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <Icon
                                        aria-label="regist visibility"
                                    >
                                        {this.state.private ? <VisibilityOff /> : <Visibility />}
                                    </Icon>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormControlLabel
                                    control={
                                        <Checkbox icon={<NotificationsOff />} checkedIcon={<NotificationsActive />} color={"primary"} />
                                    }
                                    label="Notificar quando estiver resolvido"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </Paper>

                <div id="submeter" className={"imgcontainer"}>
                    <Button variant="raised" size="small" color="primary" style={{margin:'0 auto'}} onClick={this.handleClickOpen}>
                        <AddIcon />
                        Registar Problema
                    </Button>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Tem a certeza que pretende registar o problema?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Podera posteriormente editar este registo no seu perfil na seccao reportes.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={this.handleRegistProblem} color="primary" autoFocus>
                                Sim
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <Button id={"tothankyou"} component={Link} to='/obrigada' className={classes.input} color={"primary"}>
                    Obrigada
                </Button>

                <Button id={"tologin"} component={Link} to='/login' className={classes.input} color={"primary"}>
                    Sem sessao iniciada
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(NewRegistProblem);