package org.nuvola.gwt3ready.client.application;

import org.nuvola.gwt3ready.client.NameTokens;
import org.nuvola.gwt3ready.client.application.ApplicationPresenter.MyProxy;
import org.nuvola.gwt3ready.client.application.ApplicationPresenter.MyView;

import com.google.inject.Inject;
import com.google.web.bindery.event.shared.EventBus;
import com.gwtplatform.mvp.client.Presenter;
import com.gwtplatform.mvp.client.View;
import com.gwtplatform.mvp.client.annotations.NameToken;
import com.gwtplatform.mvp.client.annotations.ProxyStandard;
import com.gwtplatform.mvp.client.proxy.ProxyPlace;

public class ApplicationPresenter extends Presenter<MyView, MyProxy> {
    @ProxyStandard
    @NameToken(NameTokens.home)
    interface MyProxy extends ProxyPlace<ApplicationPresenter> {
    }

    interface MyView extends View {
    }

    @Inject
    ApplicationPresenter(EventBus eventBus,
                         MyView view,
                         MyProxy proxy) {
        super(eventBus, view, proxy, RevealType.Root);
    }
}
