import * as React from 'react';
import * as model from '../common/interfaces'
import {connect} from 'react-redux';
import * as Redux from 'redux';
import * as Actions from '../actions';
import {getListItems} from '../reducers'

export interface ListItemProps {
    items?: { id: string, name: string, checked: boolean }[];
    products?: model.Product[];
    dispatch?: Redux.Dispatch<any>;
}

const ListItems: React.StatelessComponent<ListItemProps> = (props) => {
    let select: HTMLSelectElement;

    const addItem = ()=>{
        console.log(select.value);
        props.dispatch(Actions.addListItem(select.value));
        select.selectedIndex= 0;
    }

    return <div>
        <h2>Current List</h2>
        <ul className='list'>
            {props.items.map((p, i) => {
                return <li key={i}>
                    <span className={p.checked && 'checked'} style={{cursor:'pointer'}} onClick= { _ => { props.dispatch(Actions.toggleListItem(p.id)) } }>{p.name}</span>
                    <a onClick= { _ => { props.dispatch(Actions.removeListItem(p.id)) } }>[remove]</a>
                </li>
            }) }
        </ul>
            { props.products.length > 0 &&
                <div>
                    <hr/>
                    add new: {'  '}
                    <select onChange={addItem}
                        ref={e=>select=e}
                    >
                        <option>...choose a value</option>
                        {
                            props.products.map((p,i)=>{
                                return <option key={i} value={p.id}>
                                    {p.name}
                                    </option>
                            })
                        }
                    </select>
                </div>
            }
    </div>
}

const mapStateToProps = (s: model.StoreModel) => {
    return {
        items: getListItems(s),
        products: s.products
    }
};

export default connect(mapStateToProps)(ListItems);
